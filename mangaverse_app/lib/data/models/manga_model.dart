import '../../domain/entities/manga.dart';

class MangaModel extends Manga {
  const MangaModel({
    required super.id,
    required super.slug,
    required super.title,
    required super.contentType,
    required super.publicationStatus,
    required super.readingDirection,
    super.synopsis,
    super.coverUrl,
    super.trailerId,
    super.rating,
    super.isCommerciallyVerified,
  });

  factory MangaModel.fromJson(Map<String, dynamic> json) {
    return MangaModel(
      id: int.tryParse(json['id']?.toString() ?? '0') ?? 0,
      slug: json['slug']?.toString() ?? '',
      title: json['title']?.toString() ?? 'Untitled',
      contentType: json['content_type']?.toString() ?? 'Manga',
      publicationStatus: json['publication_status']?.toString() ?? 'ongoing',
      readingDirection: json['reading_direction']?.toString() ?? 'rtl',
      synopsis: json['synopsis']?.toString(),
      coverUrl: json['cover_url']?.toString(),
      trailerId: json['trailer_id']?.toString(),
      rating: double.tryParse(json['rating']?.toString() ?? '0') ?? 0.0,
      isCommerciallyVerified: json['is_commercially_verified'] == 1 ||
          json['is_commercially_verified'] == true,
    );
  }
}

class ChapterModel extends Chapter {
  const ChapterModel({
    required super.id,
    required super.chapterNumber,
    required super.languageCode,
    super.title,
    super.externalChapterId,
    super.pdfUrl,
    super.pageCount,
  });

  factory ChapterModel.fromJson(Map<String, dynamic> json) {
    return ChapterModel(
      id: int.tryParse(json['id']?.toString() ?? '0') ?? 0,
      chapterNumber:
          double.tryParse(json['chapter_number']?.toString() ?? '0') ?? 0.0,
      languageCode: json['language_code']?.toString() ?? 'en',
      title: json['chapter_title']?.toString(),
      externalChapterId: json['external_chapter_id']?.toString(),
      pdfUrl: json['pdf_url']?.toString(),
      pageCount: int.tryParse(json['page_count']?.toString() ?? '0') ?? 0,
    );
  }
}
