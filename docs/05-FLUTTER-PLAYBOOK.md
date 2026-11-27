# MangaVerse — Flutter Mobile Playbook

**Document:** `docs/05-FLUTTER-PLAYBOOK.md`  
**Target:** iOS & Android Mobile App Engineers  
**App Directory:** `mangaverse_app/`  
**Architecture:** Clean Architecture + Riverpod 2.5 State Management  
**Backend:** MangaVerse PHP cPanel REST API (`/api/v1`)

---

## 1. Architectural Blueprint

The MangaVerse Flutter application is designed according to **Clean Architecture** principles, maintaining strict separation of concerns across 4 distinct layers:

```
mangaverse_app/
├── lib/
│   ├── core/                        # Cross-cutting concerns & foundational config
│   │   ├── network/                 # Dio HTTP client with interceptors & baseUrl config
│   │   │   └── api_client.dart
│   │   ├── notifications/           # Firebase Cloud Messaging & local alerts
│   │   │   └── notification_service.dart
│   │   └── theme/                   # Brand dark theme tokens matching web styles.css
│   │       └── app_theme.dart
│   ├── domain/                      # Pure Dart business rules & entity definitions
│   │   └── entities/
│   │       └── manga.dart           # Manga & Chapter models (independent of JSON)
│   ├── data/                        # Concrete implementations & data sources
│   │   ├── models/                  # JSON serialization & API mapping
│   │   │   └── manga_model.dart
│   │   └── datasources/
│   │       ├── remote/              # PHP /api/v1 client (Dio)
│   │       │   └── manga_remote_ds.dart
│   │       └── local/               # SharedPreferences + path_provider file caching
│   │           └── local_storage_ds.dart
│   ├── presentation/                # Riverpod state & Flutter UI widgets
│   │   └── screens/
│   │       ├── home/                # Infinite catalog grid with shimmer loading
│   │       │   └── home_screen.dart
│   │       ├── detail/              # Series metadata, chapters & offline downloader
│   │       │   └── manga_detail_screen.dart
│   │       └── reader/              # RTL/LTR paged & Webtoon vertical scroll reader
│   │           └── reader_screen.dart
│   └── main.dart                    # Application entry point with ProviderScope
```

---

## 2. Shared API Contract (`/api/v1`)

The mobile app shares the exact same backend endpoints as the web platform:

| Endpoint | Method | Mobile Usage | Data Model |
|---|---|---|---|
| `/api/v1/manga` | `GET` | Catalog browsing & search (`page`, `search`, `genre`) | `MangaModel` |
| `/api/v1/manga/{slug}/chapters` | `GET` | Series chapter listing & numbering | `ChapterModel` |
| `/api/v1/proxy/pages/{uuid}` | `GET` | Ephemeral signed CDN page URLs | `List<String>` |
| `/api/v1/user/progress` | `GET / POST` | Cross-device reading progress synchronization | `ReadingProgress` |
| `/api/v1/user/bookmarks` | `GET / POST` | User library cloud synchronization | `List<String>` (slugs) |

---

## 3. Offline-First & Storage Engine

### 3.1 Chapter Download Pipeline
When the user taps "Save for Offline" on `MangaDetailScreen`:
1. `MangaRemoteDataSource.fetchChapterPages(uuid)` requests the signed page URLs from the backend.
2. `LocalStorageDataSource.downloadChapter()` downloads each page sequentially via Dio as raw bytes.
3. Pages are saved to `${applicationDocumentsDirectory}/mangaverse/{mangaSlug}/{chapterUuid}/{000}.webp`.
4. The chapter UUID is recorded in `SharedPreferences` under `mv_downloaded_chapters`.
5. Progress is emitted live to update the UI progress indicator (`0.0` → `1.0`).

### 3.2 Offline Reader Source Resolution
When opening `ReaderScreen`:
1. The reader checks `LocalStorageDataSource.getOfflineChapterPages(mangaSlug, chapterUuid)`.
2. If local files exist, it instantiates `_ReaderSource.local(File)` — reading directly from disk with zero network requests.
3. If not cached, it falls back to `_ReaderSource.network(url)` backed by `CachedNetworkImage` with memory and disk cache.

---

## 4. Push Notifications (FCM)

### 4.1 Topic Subscription Strategy
To eliminate heavy notification database polling, MangaVerse utilizes **FCM Topic Subscriptions**:
- Topic format: `manga_{mangaId}` (e.g., `manga_42`)
- When a user bookmarks a manga, the app calls `NotificationService.subscribeToManga(mangaId)`.
- When unbookmarked, `NotificationService.unsubscribeFromManga(mangaId)` is triggered.
- When `sync_chapters.php` discovers a new chapter on the backend, it sends a single multicast request to FCM for that topic.

### 4.2 Foreground & Background Handling
- **Foreground:** `FirebaseMessaging.onMessage` intercepts the message and presents a high-priority banner via `flutter_local_notifications`.
- **Background / Terminated:** `_firebaseMessagingBackgroundHandler` wakes up in an isolated Dart VM to present the notification.

---

## 5. Development & Deployment Guide

### 5.1 Local Setup
```bash
# 1. Navigate to mobile directory
cd E:\Manga\mangaverse_app

# 2. Generate native platform folders (if cloned fresh)
flutter create . --platforms=android,ios

# 3. Install dependencies
flutter pub get

# 4. Run automated unit tests
flutter test

# 5. Launch debug build pointing to local or staging API
flutter run --dart-define=API_BASE_URL=https://yourdomain.com/api/v1
```

### 5.2 Release Build (Android)
```bash
# Generate signed Android App Bundle (AAB) for Google Play Store
flutter build appbundle --release --dart-define=API_BASE_URL=https://yourdomain.com/api/v1
```

### 5.3 Release Build (iOS)
```bash
# Generate signed iOS archive for TestFlight / App Store Connect
flutter build ipa --release --dart-define=API_BASE_URL=https://yourdomain.com/api/v1
```
