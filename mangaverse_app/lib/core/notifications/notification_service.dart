// notification_service.dart — FCM implementation with firebase_messaging
//
// Setup checklist:
//   1. Run `flutterfire configure` to generate firebase_options.dart
//   2. Add google-services.json (Android) / GoogleService-Info.plist (iOS)
//   3. Call NotificationService.init() from main.dart BEFORE runApp()

import 'dart:async';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/// Background message handler — MUST be a top-level function.
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  final localNotif = FlutterLocalNotificationsPlugin();
  final slug = message.data['manga_id'] ?? message.data['slug'] ?? '';
  await localNotif.show(
    message.hashCode,
    message.notification?.title ?? 'New Chapter',
    message.notification?.body ?? 'A new chapter is available!',
    const NotificationDetails(
      android: AndroidNotificationDetails(
        'new_chapters',
        'New Chapters',
        channelDescription: 'Alerts when a followed manga posts a new chapter',
        importance: Importance.high,
        priority: Priority.high,
      ),
      iOS: DarwinNotificationDetails(presentAlert: true, presentBadge: true),
    ),
    payload: slug.toString(),
  );
}

class NotificationService {
  static final _fcm = FirebaseMessaging.instance;
  static final _localNotif = FlutterLocalNotificationsPlugin();

  static final StreamController<String> _notificationTapStream =
      StreamController<String>.broadcast();

  /// Stream of manga slugs tapped by the user from notifications
  static Stream<String> get onNotificationTap => _notificationTapStream.stream;

  static String topicForManga(int mangaId) => 'manga_$mangaId';

  /// Must be called once before [runApp].
  static Future<void> init() async {
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // Request permissions
    await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Initialize local notifications channel
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosInit = DarwinInitializationSettings();
    await _localNotif.initialize(
      const InitializationSettings(android: androidInit, iOS: iosInit),
      onDidReceiveNotificationResponse: (NotificationResponse response) {
        if (response.payload != null && response.payload!.isNotEmpty) {
          _notificationTapStream.add(response.payload!);
        }
      },
    );

    // Foreground message handler
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      final slug = message.data['manga_id'] ?? message.data['slug'] ?? '';
      if (message.notification != null) {
        await _localNotif.show(
          message.hashCode,
          message.notification!.title,
          message.notification!.body,
          const NotificationDetails(
            android: AndroidNotificationDetails(
              'new_chapters',
              'New Chapters',
              channelDescription: 'Alerts when a followed manga posts a new chapter',
              importance: Importance.high,
              priority: Priority.high,
            ),
            iOS: DarwinNotificationDetails(presentAlert: true, presentBadge: true),
          ),
          payload: slug.toString(),
        );
      }
    });

    // Handle notification tap when app opened from background
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      final slug = message.data['manga_id'] ?? message.data['slug'];
      if (slug != null && slug.toString().isNotEmpty) {
        _notificationTapStream.add(slug.toString());
      }
    });
  }

  /// Returns initial notification slug if app was launched by tapping a notification
  static Future<String?> getInitialNotificationSlug() async {
    final initialMessage = await _fcm.getInitialMessage();
    if (initialMessage != null) {
      final slug = initialMessage.data['manga_id'] ?? initialMessage.data['slug'];
      if (slug != null) return slug.toString();
    }
    return null;
  }

  /// Subscribe device to new-chapter alerts for a specific manga.
  static Future<void> subscribeToManga(int mangaId) =>
      _fcm.subscribeToTopic(topicForManga(mangaId));

  /// Unsubscribe device from new-chapter alerts for a specific manga.
  static Future<void> unsubscribeFromManga(int mangaId) =>
      _fcm.unsubscribeFromTopic(topicForManga(mangaId));

  /// Returns current FCM registration token.
  static Future<String?> getToken() => _fcm.getToken();
}
