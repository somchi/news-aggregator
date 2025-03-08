import {
  guardianQueryBuilder,
  newsQueryBuilder,
  nytQueryBuilder,
  responseSchema,
} from './helper';
import { SearchParams } from './types';

const NYT_BASE_URL = process.env.NEXT_PUBLIC_NYT_API_URL;
const GUARDIAN_BASE_URL = process.env.NEXT_PUBLIC_GUARDIAN_API_URL;

const NYT_API_KEY = process.env.NEXT_PUBLIC_NYT_KEY;
const GUARDIAN_API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_KEY;

export const getNYTArticles = async (searchParams: SearchParams) => {
  const query = nytQueryBuilder(searchParams);
  try {
    const url = `${NYT_BASE_URL}?api-key=${NYT_API_KEY}&sort=newest&${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return responseSchema(response.status, data);
  } catch {
    return responseSchema(500, { data: { msg: 'An error occurred' } });
  }
};

export const getGuardianArticles = async (searchParams: SearchParams) => {
  const query = guardianQueryBuilder(searchParams);
  try {
    const url = `${GUARDIAN_BASE_URL}?api-key=${GUARDIAN_API_KEY}&order-by=newest&show-fields=byline,publication&${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return responseSchema(response.status, data);
  } catch {
    return responseSchema(500, { data: { msg: 'An error occurred' } });
  }
};

export const getNewsAPIArticles = async (searchParams: SearchParams) => {
  const query =
    Object.keys(searchParams).length > 0
      ? newsQueryBuilder(searchParams)
      : 'q=news';
  try {
    const url = `/api?${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return responseSchema(response.status, data);
  } catch {
    return responseSchema(500, { data: { msg: 'An error occurred' } });
  }
};
