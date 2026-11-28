import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'core/notifications/notification_service.dart';
import 'core/theme/app_theme.dart';
import 'domain/entities/manga.dart';
import 'presentation/screens/detail/manga_detail_screen.dart';
import 'presentation/screens/home/home_screen.dart';
import 'presentation/screens/reader/reader_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
        routes: [
          GoRoute(
            path: 'manga/:id',
            name: 'manga-detail',
            builder: (context, state) {
              final manga = state.extra as Manga?;
              final id = state.pathParameters['id'] ?? '';
              if (manga != null) {
                return MangaDetailScreen(manga: manga);
              }
              // Fallback placeholder when opened directly via deep link
              return MangaDetailScreen(
                manga: Manga(
                  id: 0,
                  slug: id,
                  title: id.replaceAll('-', ' ').toUpperCase(),
                  status: 'ongoing',
                ),
              );
            },
            routes: [
              GoRoute(
                path: 'read/:chapter',
                name: 'reader',
                builder: (context, state) {
                  final id = state.pathParameters['id'] ?? '';
                  final ch = state.pathParameters['chapter'] ?? '1';
                  return ReaderScreen(
                    title: 'Chapter $ch',
                    externalChapterId: ch,
                    mangaSlug: id,
                  );
                },
              ),
            ],
          ),
        ],
      ),
    ],
  );
});

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await NotificationService.init();
  } catch (_) {}
  runApp(const ProviderScope(child: MangaVerseApp()));
}

class MangaVerseApp extends ConsumerStatefulWidget {
  const MangaVerseApp({super.key});

  @override
  ConsumerState<MangaVerseApp> createState() => _MangaVerseAppState();
}

class _MangaVerseAppState extends ConsumerState<MangaVerseApp> {
  @override
  void initState() {
    super.initState();

    // Listen for FCM notification taps to navigate via GoRouter
    NotificationService.onNotificationTap.listen((slug) {
      if (slug.isNotEmpty) {
        ref.read(routerProvider).push('/manga/$slug');
      }
    });

    NotificationService.getInitialNotificationSlug().then((slug) {
      if (slug != null && slug.isNotEmpty) {
        ref.read(routerProvider).push('/manga/$slug');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'MangaVerse',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme(),
      routerConfig: router,
    );
  }
}
