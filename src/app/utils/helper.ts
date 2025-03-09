import { keyMapGuardian, keyMapNews, keyMapNYT, NYTExcepts } from './constants';
import {
  Article,
  GuardianArticle,
  NewsAPIArticle,
  NYTArticle,
  Preferences,
  Query,
  SearchParams,
} from './types';

export const todaysDate = (): string => {
  const date = new Date();

  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  return today;
};

export const responseSchema = <T>(code: number, data: T) => {
  return { status: code, data: data };
};

export const createQueryString = <T extends { toString(): string }>(
  data: Query<T>[],
  searchParams: URLSearchParams
): string => {
  const params = new URLSearchParams(searchParams);
  data.forEach(({ name, value }) => {
    params.set(name, value.toString());
  });
  // params.set(name, value);

  return params.toString();
};

export const aggregateData = (
  nyt: NYTArticle[],
  newsAPI: NewsAPIArticle[],
  guardian: GuardianArticle[]
) => {
  const formattedNews: Article[] = [
    ...nyt.map((itm: NYTArticle) => ({
      title: itm.snippet,
      source: itm.source,
      author: itm.byline.original,
      date: itm.pub_date,
      description: itm.abstract,
      img: '',
      category: itm.section_name,
    })),
    ...newsAPI.map((itm: NewsAPIArticle) => ({
      title: itm.title,
      source: itm.source?.name ?? '',
      author: itm.author,
      date: itm.publishedAt,
      description: itm.description,
      img: itm.urlToImage,
      category: '',
    })),
    ...guardian.map((itm: GuardianArticle) => ({
      title: itm.webTitle,
      source: 'The guardian',
      author: itm.fields.byline,
      date: itm.webPublicationDate,
      description: itm.webTitle,
      img: '',
      category: itm.sectionName,
    })),
  ];
  return formattedNews;
};

export const formatDate = (articleDate: string): string => {
  const date = new Date(articleDate);

  const today = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  return today.replaceAll('-', '/');
};

export const paramsToObject = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams.entries());
};

export const parseQueryString = (queryString: string) => {
  if (!queryString) return {};
  if (!queryString.length) return {};

  const query = queryString.replace(/^\?/, '').split('&');
  const queryObj: Record<string, string> = {};
  query.forEach((item) => {
    const [key, value] = item.split('=');
    queryObj[key] = value;
  });
  return queryObj;
};

export const buildQueryString = (queryObj: SearchParams): string => {
  if (!queryObj) return '';
  const query = Object.keys(queryObj)
    .map((key) => {
      if (
        (queryObj[key] && queryObj[key] !== '') ||
        queryObj[key] !== undefined
      ) {
        return `${key}=${encodeURIComponent(queryObj?.[key].toString())}`;
      } else {
        return '';
      }
    })
    .filter((value) => !!value)
    .join('&');

  return `${query}`;
};

const formatValue = (key: string, value?: string | string[]) => {
  return key === 'categories'
    ? `section_name:(${value?.toString()})`
    : key === 'source'
    ? `source:(${value?.toString()})`
    : `byline:(${value?.toString()})`;
};

export const nytQueryBuilder = (queryObj: SearchParams): string => {
  const queryMap = Object.entries(queryObj).reduce(
    (acc: SearchParams, [key, value]) => {
      if (acc[keyMapNYT[key]]) {
        const newValue = formatValue(key, value);
        acc[keyMapNYT[key]] = `${acc[keyMapNYT[key]]}AND${newValue}`;
      } else {
        acc[keyMapNYT[key]] = NYTExcepts.includes(key)
          ? value
          : formatValue(key, value);
      }
      return acc;
    },
    {}
  );
  const query = buildQueryString(queryMap);
  return query;
};

export const newsQueryBuilder = (queryObj: SearchParams): string => {
  const queryMap = Object.entries(queryObj).reduce(
    (acc: SearchParams, [key, value]) => {
      if (acc[keyMapNews[key]]) {
        acc[keyMapNews[key]] = `${acc[keyMapNews[key]]},${value?.toString()}`;
      } else {
        acc[keyMapNews[key]] =
          typeof value === 'object' ? value.toString() : value;
      }
      return acc;
    },
    {}
  );
  const query = buildQueryString(queryMap);
  return query;
};
export const guardianQueryBuilder = (queryObj: SearchParams): string => {
  const queryMap = Object.entries(queryObj).reduce(
    (acc: SearchParams, [key, value]) => {
      if (acc[keyMapGuardian[key]]) {
        acc[keyMapGuardian[key]] = `${
          acc[keyMapGuardian[key]]
        },${value?.toString()}`;
      } else {
        acc[keyMapGuardian[key]] =
          typeof value === 'object' ? value.toString() : value;
      }
      return acc;
    },
    {}
  );
  const query = buildQueryString(queryMap);
  return query;
};

export const formatArticleDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  return formatter;
};

export const paginate = (totals: number[]) => {
  const largets = Math.max(...totals);
  const numPages = Math.floor(largets / 10);
  return numPages > 10 ? 10 : numPages;
};

export const queryParams = (
  searchParams: SearchParams,
  preferences: Partial<Preferences>
): SearchParams => {
  const page = searchParams.page;
  if (!page) {
    return Object.keys(searchParams).length > 0
      ? searchParams
      : Object.keys(preferences).length > 0
      ? preferences
      : {};
  } else {
    return Object.keys(searchParams).filter((key) => key !== 'page').length > 0
      ? searchParams
      : Object.keys(preferences).length > 0
      ? { ...preferences, ...(page && { page }) }
      : { ...(page && { page }) };
  }
};

export const specificDate = (day: number) => {
  const today = new Date();
  const nDaysAgo = new Date(today.setDate(today.getDate() - day));
  return formatArticleDate(nDaysAgo).replaceAll('/', '-');
};
