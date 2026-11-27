import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_theme.dart';
import '../../../data/datasources/local/local_storage_ds.dart';
import '../../../domain/entities/manga.dart';
import '../home/home_screen.dart';
import '../reader/reader_screen.dart';

final localStorageProvider = Provider<LocalStorageDataSource>(
  (ref) => LocalStorageDataSource(),
);

final chaptersProvider = FutureProvider.autoDispose
    .family<List<Chapter>, String>((ref, slug) async {
  return ref.watch(remoteDsProvider).fetchChapters(slug);
});

class MangaDetailScreen extends ConsumerStatefulWidget {
  const MangaDetailScreen({super.key, required this.manga});

  final Manga manga;

  @override
  ConsumerState<MangaDetailScreen> createState() => _MangaDetailScreenState();
}

class _MangaDetailScreenState extends ConsumerState<MangaDetailScreen> {
  bool _bookmarked = false;

  @override
  void initState() {
    super.initState();
    ref.read(localStorageProvider).getBookmarks().then((set) {
      if (mounted) {
        setState(() => _bookmarked = set.contains(widget.manga.slug));
      }
    });
  }

  Future<void> _toggleBookmark() async {
    final added =
        await ref.read(localStorageProvider).toggleBookmark(widget.manga.slug);
    if (mounted) setState(() => _bookmarked = added);
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.manga;
    final chaptersAsync = ref.watch(chaptersProvider(m.slug));

    return Scaffold(
      appBar: AppBar(
        title: Text(m.title, overflow: TextOverflow.ellipsis),
        actions: [
          IconButton(
            tooltip: _bookmarked ? 'Remove Bookmark' : 'Bookmark',
            icon: Icon(
              _bookmarked ? Icons.bookmark : Icons.bookmark_border,
              color: _bookmarked ? AppTheme.cyan : null,
            ),
            onPressed: _toggleBookmark,
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: SizedBox(
                  width: 120,
                  child: AspectRatio(
                    aspectRatio: 2 / 3,
                    child: m.coverUrl != null
                        ? CachedNetworkImage(
                            imageUrl: m.coverUrl!,
                            fit: BoxFit.cover,
                          )
                        : Container(color: AppTheme.bgElevated),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      m.title,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 6),
                    Text('${m.contentType} • ${m.publicationStatus}'),
                    const SizedBox(height: 6),
                    Text('★ ${m.rating.toStringAsFixed(1)}'),
                    if (m.isCommerciallyVerified)
                      const Padding(
                        padding: EdgeInsets.only(top: 6),
                        child: Chip(label: Text('Verified License')),
                      ),
                  ],
                ),
              ),
            ],
          ),
          if (m.synopsis != null && m.synopsis!.isNotEmpty) ...[
            const SizedBox(height: 16),
            Text(
              m.synopsis!,
              style: const TextStyle(color: AppTheme.textSecondary),
            ),
          ],
          const SizedBox(height: 20),
          Text(
            'Chapters',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          chaptersAsync.when(
            loading: () => const Padding(
              padding: EdgeInsets.all(24),
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (_, __) => const Text('Could not load chapter list.'),
            data: (chapters) {
              if (chapters.isEmpty) {
                return const Text('No chapters published yet.');
              }
              return Column(
                children: chapters.map((ch) {
                  final chapId = ch.externalChapterId ?? ch.id.toString();
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text('Chapter ${ch.chapterNumber}'),
                    subtitle: ch.title != null ? Text(ch.title!) : null,
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          tooltip: 'Save for Offline',
                          icon: const Icon(Icons.download_for_offline_outlined),
                          onPressed: () async {
                            final pages = await ref
                                .read(remoteDsProvider)
                                .fetchChapterPages(chapId);
                            if (pages.isEmpty) return;
                            await ref.read(localStorageProvider).downloadChapter(
                                  mangaSlug: m.slug,
                                  chapterUuid: chapId,
                                  pageUrls: pages,
                                );
                            if (context.mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Saved Ch. ${ch.chapterNumber} offline'),
                                ),
                              );
                            }
                          },
                        ),
                        const Icon(Icons.chevron_right),
                      ],
                    ),
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => ReaderScreen(
                          title: '${m.title} — Ch. ${ch.chapterNumber}',
                          externalChapterId: chapId,
                          mangaSlug: m.slug,
                          isRtl: m.readingDirection == 'rtl',
                        ),
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}
