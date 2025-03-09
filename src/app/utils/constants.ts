export const ArticleCategories = [
  'business',
  'football',
  'science',
  'sports',
  'technology',
  'world news',
  'music',
  'politics',
  'food',
];

export const ArticleSources = [
  'The New York Times',
  'CBS News',
  'ABC News',
  'The Verge',
  'BBC News',
  'Bloomberg',
  'theguardian.com',
];

export const ArticleAuthor = [
  'Sheena Vasani',
  'Matthew Gault',
  'Vox Creative',
  'Todd Haselton',
  'Julian Chokkattu',
  'Wes Davis',
  'John Brewin',
];

export const keyMapNYT: Record<string, string> = {
  search: 'q',
  dateFrom: 'begin_date',
  dateTo: 'end_date',
  categories: 'fq',
  source: 'fq',
  authors: 'fq',
  page: 'page',
};

export const keyMapGuardian: Record<string, string> = {
  search: 'q',
  dateFrom: 'from-date',
  dateTo: 'to-date',
  categories: 'section',
  source: 'publication',
  authors: 'byline',
  page: 'page',
};
export const keyMapNews: Record<string, string> = {
  search: 'q',
  dateFrom: 'from',
  dateTo: 'to',
  categories: 'q',
  source: 'sources',
  authors: 'q',
  page: 'page',
};

export const NYTExcepts = ['search', 'dateFrom', 'dateTo', 'page'];
