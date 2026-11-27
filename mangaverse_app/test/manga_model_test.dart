import 'package:flutter_test/flutter_test.dart';
import 'package:mangaverse_app/data/models/manga_model.dart';

void main() {
  test('MangaModel.fromJson parses API payload cleanly', () {
    final model = MangaModel.fromJson({
      'id': 42,
      'slug': 'chrono-blade',
      'title': 'Chrono-Blade',
      'content_type': 'Manga',
      'publication_status': 'ongoing',
      'reading_direction': 'rtl',
      'rating': 4.9,
      'is_commercially_verified': 1,
    });

    expect(model.id, 42);
    expect(model.slug, 'chrono-blade');
    expect(model.isCommerciallyVerified, true);
    expect(model.rating, 4.9);
  });

  test('ChapterModel.fromJson parses decimal chapter numbers', () {
    final ch = ChapterModel.fromJson({
      'id': 10,
      'chapter_number': '45.5',
      'language_code': 'en',
      'external_chapter_id': 'uuid-1234',
      'page_count': 22,
    });

    expect(ch.chapterNumber, 45.5);
    expect(ch.externalChapterId, 'uuid-1234');
    expect(ch.pageCount, 22);
  });
}
