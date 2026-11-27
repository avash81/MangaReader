# MangaVerse Mobile App (Flutter)

Clean Architecture + Riverpod mobile client for **MangaVerse**, sharing the exact same `/api/v1/*` backend as the web platform.

## Architecture
- `lib/core/` — `ApiClient` (Dio), `AppTheme` (matches web CSS tokens)
- `lib/domain/` — Pure Dart entities (`Manga`, `Chapter`) and repository contracts
- `lib/data/` — DTO models, remote API datasource (`/v1/manga`, `/v1/manga/{id}/chapters`, `/v1/proxy/pages/{uuid}`), local download storage, repository implementation
- `lib/presentation/` — Riverpod providers, `HomeScreen` (2-col mobile grid + shimmer skeletons), `MangaDetailScreen`, and `ReaderScreen` (dual `Paged` RTL/LTR + `Webtoon` vertical scroll modes)

## Quick Start
```bash
cd mangaverse_app
flutter create . --platforms=android,ios
flutter pub get
flutter run --dart-define=API_BASE_URL=https://yourdomain.com/api/v1
```
