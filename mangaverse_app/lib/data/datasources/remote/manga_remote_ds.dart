import 'package:dio/dio.dart';

import '../../core/network/api_client.dart';
import '../models/manga_model.dart';

class MangaRemoteDataSource {
  MangaRemoteDataSource(this._client);

  final ApiClient _client;

  Future<List<MangaModel>> fetchCatalog({
    int limit = 24,
    int offset = 0,
    String query = '',
  }) async {
    final res = await _client.dio.get(
      '/manga',
      queryParameters: {
        'limit': limit,
        'offset': offset,
        if (query.isNotEmpty) 'q': query,
      },
    );
    final list = (res.data['manga'] as List?) ?? [];
    return list
        .map((e) => MangaModel.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();
  }

  Future<List<ChapterModel>> fetchChapters(String mangaIdOrSlug) async {
    final res = await _client.dio.get('/manga/$mangaIdOrSlug/chapters');
    final list = (res.data['chapters'] as List?) ?? [];
    return list
        .map((e) => ChapterModel.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();
  }

  Future<List<String>> fetchChapterPages(String externalChapterId) async {
    final res = await _client.dio.get('/proxy/pages/$externalChapterId');
    final pages = (res.data['pageUrls'] as List?) ?? [];
    return pages.map((e) => e.toString()).toList();
  }

  Future<void> syncProgress({
    required String token,
    required String slug,
    required double chapterNumber,
    required int pageNumber,
  }) async {
    await _client.dio.post(
      '/user/progress',
      data: {
        'slug': slug,
        'chapter_number': chapterNumber,
        'page_number': pageNumber,
      },
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
  }
}
