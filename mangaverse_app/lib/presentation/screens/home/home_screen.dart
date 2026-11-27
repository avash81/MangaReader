import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

import '../../../core/network/api_client.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/datasources/remote/manga_remote_ds.dart';
import '../../../domain/entities/manga.dart';
import '../detail/manga_detail_screen.dart';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

final remoteDsProvider = Provider<MangaRemoteDataSource>(
  (ref) => MangaRemoteDataSource(ref.watch(apiClientProvider)),
);

final catalogProvider = FutureProvider.autoDispose<List<Manga>>((ref) async {
  return ref.watch(remoteDsProvider).fetchCatalog(limit: 24, offset: 0);
});

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final catalogAsync = ref.watch(catalogProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('MangaVerse')),
      body: catalogAsync.when(
        loading: () => GridView.builder(
          padding: const EdgeInsets.all(12),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 0.62,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: 8,
          itemBuilder: (_, __) => Shimmer.fromColors(
            baseColor: AppTheme.bgCard,
            highlightColor: AppTheme.bgElevated,
            child: Container(
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
        ),
        error: (err, _) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('Unable to load catalog'),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () => ref.invalidate(catalogProvider),
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        ),
        data: (items) => GridView.builder(
          padding: const EdgeInsets.all(12),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 0.62,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: items.length,
          itemBuilder: (ctx, i) {
            final m = items[i];
            return InkWell(
              onTap: () => Navigator.of(ctx).push(
                MaterialPageRoute(
                  builder: (_) => MangaDetailScreen(manga: m),
                ),
              ),
              child: Card(
                clipBehavior: Clip.antiAlias,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: AspectRatio(
                        aspectRatio: 2 / 3,
                        child: m.coverUrl != null
                            ? CachedNetworkImage(
                                imageUrl: m.coverUrl!,
                                fit: BoxFit.cover,
                                width: double.infinity,
                              )
                            : Container(color: AppTheme.bgElevated),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8),
                      child: Text(
                        m.title,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
