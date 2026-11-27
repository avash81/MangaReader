import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../home/home_screen.dart';

enum ReadingMode { paged, webtoon }

class ReaderScreen extends ConsumerStatefulWidget {
  const ReaderScreen({
    super.key,
    required this.title,
    required this.externalChapterId,
    this.isRtl = true,
  });

  final String title;
  final String externalChapterId;
  final bool isRtl;

  @override
  ConsumerState<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends ConsumerState<ReaderScreen> {
  ReadingMode _mode = ReadingMode.webtoon;
  late Future<List<String>> _pagesFuture;

  @override
  void initState() {
    super.initState();
    _pagesFuture = ref
        .read(remoteDsProvider)
        .fetchChapterPages(widget.externalChapterId);
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
      body: FutureBuilder<List<String>>(
        future: _pagesFuture,
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snap.hasError || !snap.hasData || snap.data!.isEmpty) {
            return const Center(child: Text('Chapter pages unavailable'));
          }
          final pages = snap.data!;
          if (_mode == ReadingMode.paged) {
            return PageView.builder(
              reverse: widget.isRtl,
              itemCount: pages.length,
              itemBuilder: (_, idx) => InteractiveViewer(
                minScale: 1.0,
                maxScale: 4.0,
                child: CachedNetworkImage(
                  imageUrl: pages[idx],
                  fit: BoxFit.contain,
                ),
              ),
            );
          }
          return ListView.builder(
            cacheExtent: 2000,
            itemCount: pages.length,
            itemBuilder: (_, idx) => CachedNetworkImage(
              imageUrl: pages[idx],
              fit: BoxFit.fitWidth,
              width: double.infinity,
            ),
          );
        },
      ),
    );
  }
}
