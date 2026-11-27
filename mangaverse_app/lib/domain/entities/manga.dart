/// Pure domain entities (independent of JSON/HTTP/DB frameworks).
class Manga {
  const Manga({
    required this.id,
    required this.slug,
    required this.title,
    required this.contentType,
    required this.publicationStatus,
    required this.readingDirection,
    this.synopsis,
    this.coverUrl,
    this.trailerId,
    this.rating = 0.0,
    this.isCommerciallyVerified = false,
  });

  final int id;
  final String slug;
  final String title;
  final String contentType;
  final String publicationStatus;
  final String readingDirection;
  final String? synopsis;
  final String? coverUrl;
  final String? trailerId;
  final double rating;
  final bool isCommerciallyVerified;
}

class Chapter {
  const Chapter({
    required this.id,
    required this.chapterNumber,
    required this.languageCode,
    this.title,
    this.externalChapterId,
    this.pdfUrl,
    this.pageCount = 0,
  });

  final int id;
  final double chapterNumber;
  final String languageCode;
  final String? title;
  final String? externalChapterId;
  final String? pdfUrl;
  final int pageCount;
}
