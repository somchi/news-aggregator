export type Query<T> = {
  name: string;
  value: T;
};

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type Article = {
  source: string;
  author: string;
  date: string;
  title: string;
  description: string;
  img: string;
  category: string;
  url: string;
};

export type NewsAPIArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type GuardianArticle = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: false;
  pillarId: string;
  pillarName: string;
  fields: { [key: string]: string };
};

export type NYTArticle = {
  abstract: string;
  web_url: string;
  snippet: string;
  print_page: number;
  print_section: string;
  source: string;
  keywords: {
    name: string;
    value: string;
    rank: number;
    major: string;
  }[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string;
    person: [
      {
        firstname: string;
        middlename: string;
        lastname: string;
        qualifier: string;
        title: string;
        role: string;
        organization: string;
        rank: 1;
      }
    ];
    organization: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};

export type AppStore = {
  categories: string[];
  sources: string[];
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  showMenu: boolean;
  search: string;
  preferences: Partial<Preferences>;
};

export type Preferences = {
  sources: string[];
  categories: string[];
  authors: string[];
};

export type Payload = Partial<AppStore>;

export type Action = { type: string; payload: Payload };

export type FilterDate = {
  from: Date | string;
  to?: Date | string;
};

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};
