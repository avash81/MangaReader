/// Skeleton for Firebase Cloud Messaging (FCM) topic subscriptions.
/// Pair with `firebase_messaging` when Firebase config files are added.
class NotificationService {
  static String topicForManga(int mangaId) => 'manga_$mangaId';

  Future<void> subscribeToManga(int mangaId) async {
    // Wire FirebaseMessaging.instance.subscribeToTopic(topicForManga(mangaId));
  }

  Future<void> unsubscribeFromManga(int mangaId) async {
    // Wire FirebaseMessaging.instance.unsubscribeFromTopic(topicForManga(mangaId));
  }
}
