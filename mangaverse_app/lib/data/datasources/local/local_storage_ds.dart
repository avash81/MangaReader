import 'dart:io';
import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Manages local bookmarks and offline chapter image downloads.
class LocalStorageDataSource {
  static const _bookmarksKey = 'mv_bookmarked_slugs';
  static const _downloadedKey = 'mv_downloaded_chapters';

  Future<Set<String>> getBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    return (prefs.getStringList(_bookmarksKey) ?? const []).toSet();
  }

  Future<bool> toggleBookmark(String slug) async {
    final prefs = await SharedPreferences.getInstance();
    final current = (prefs.getStringList(_bookmarksKey) ?? const []).toSet();
    final added = current.add(slug);
    if (!added) current.remove(slug);
    await prefs.setStringList(_bookmarksKey, current.toList());
    return added;
  }

  Future<Set<String>> getDownloadedChapters() async {
    final prefs = await SharedPreferences.getInstance();
    return (prefs.getStringList(_downloadedKey) ?? const []).toSet();
  }

  Future<String> downloadChapter({
    required String mangaSlug,
    required String chapterUuid,
    required List<String> pageUrls,
    void Function(int current, int total)? onProgress,
  }) async {
    final docsDir = await getApplicationDocumentsDirectory();
    final dir = Directory('${docsDir.path}/mangaverse/$mangaSlug/$chapterUuid');
    await dir.create(recursive: true);

    final dio = Dio();
    for (int i = 0; i < pageUrls.length; i++) {
      final res = await dio.get<List<int>>(
        pageUrls[i],
        options: Options(responseType: ResponseType.bytes),
      );
      final file = File('${dir.path}/${i.toString().padLeft(3, '0')}.webp');
      if (res.data != null) {
        await file.writeAsBytes(res.data!);
      }
      onProgress?.call(i + 1, pageUrls.length);
    }

    final prefs = await SharedPreferences.getInstance();
    final downloaded = (prefs.getStringList(_downloadedKey) ?? const []).toSet();
    downloaded.add(chapterUuid);
    await prefs.setStringList(_downloadedKey, downloaded.toList());
    return dir.path;
  }

  Future<List<File>> getOfflineChapterPages({
    required String mangaSlug,
    required String chapterUuid,
  }) async {
    final docsDir = await getApplicationDocumentsDirectory();
    final dir = Directory('${docsDir.path}/mangaverse/$mangaSlug/$chapterUuid');
    if (!await dir.exists()) return const [];
    final files = dir
        .listSync()
        .whereType<File>()
        .toList()
      ..sort((a, b) => a.path.compareTo(b.path));
    return files;
  }
}
