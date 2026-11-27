import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../detail/manga_detail_screen.dart';
import '../home/home_screen.dart';

enum ReadingMode { paged, webtoon }

class _ReaderSource {
  const _ReaderSource({this.urls = const [], this.files = const []});
  final List<String> urls;
  final List<File> files;
  bool get isOffline => files.isNotEmpty;
  int get count => isOffline ? files.length : urls.length;
}

class ReaderScreen extends ConsumerStatefulWidget {
  const ReaderScreen({
    super.key,
    required this.title,
    required this.externalChapterId,
    this.mangaSlug,
    this.isRtl = true,
  });

  final String title;
  final String externalChapterId;
  final String? mangaSlug;
  final bool isRtl;

  @override
  ConsumerState<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends ConsumerState<ReaderScreen> {
  ReadingMode _mode = ReadingMode.webtoon;
  late Future<_ReaderSource> _sourceFuture;

  @override
  void initState() {
    super.initState();
    _sourceFuture = _loadSource();
  }

  Future<_ReaderSource> _loadSource() async {
    if (widget.mangaSlug != null) {
      final offlineFiles = await ref
          .read(localStorageProvider)
          .getOfflineChapterPages(
            mangaSlug: widget.mangaSlug!,
            chapterUuid: widget.externalChapterId,
          );
      if (offlineFiles.isNotEmpty) {
        return _ReaderSource(files: offlineFiles);
      }
    }
    final urls = await ref
        .read(remoteDsProvider)
        .fetchChapterPages(widget.externalChapterId);
    return _ReaderSource(urls: urls);
  }

  Widget _buildPage(_ReaderSource src, int idx, BoxFit fit) {
    if (src.isOffline) {
      return Image.file(src.files[idx], fit: fit, width: double.infinity);
    }
    return CachedNetworkImage(
      imageUrl: src.urls[idx],
      fit: fit,
      width: double.infinity,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title, overflow: TextOverflow.ellipsis),
        actions: [
          IconButton(
            tooltip: 'Toggle Paged / Webtoon',
            icon: Icon(
              _mode == ReadingMode.webtoon
                  ? Icons.view_carousel_outlined
                  : Icons.view_day_outlined,
            ),
            onPressed: () {
              setState(() {
                _mode = _mode == ReadingMode.webtoon
                    ? ReadingMode.paged
                    : ReadingMode.webtoon;
              });
            },
          ),
        ],
      ),
      body: FutureBuilder<_ReaderSource>(
        future: _sourceFuture,
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snap.hasError || !snap.hasData || snap.data!.count == 0) {
            return const Center(child: Text('Chapter pages unavailable'));
          }
          final src = snap.data!;
          if (_mode == ReadingMode.paged) {
            return PageView.builder(
              reverse: widget.isRtl,
              itemCount: src.count,
              itemBuilder: (_, idx) => InteractiveViewer(
                minScale: 1.0,
                maxScale: 4.0,
                child: _buildPage(src, idx, BoxFit.contain),
              ),
            );
          }
          return ListView.builder(
            cacheExtent: 2000,
            itemCount: src.count,
            itemBuilder: (_, idx) => _buildPage(src, idx, BoxFit.fitWidth),
          );
        },
      ),
    );
  }
}
