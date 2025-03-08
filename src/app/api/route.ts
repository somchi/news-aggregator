import { NextRequest, NextResponse } from 'next/server';
import { paramsToObject, buildQueryString } from '../utils/helper';

const NEWSAPI_BASE_URL = process.env.NEXT_PUBLIC_NEWSAPI_API_URL;
const NEWSAPI_API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = paramsToObject(searchParams);
  const qString = buildQueryString(query);
  const url = `${NEWSAPI_BASE_URL}?pageSize=10&apiKey=${NEWSAPI_API_KEY}&sortBy=publishedAt&${qString}`;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });
  return res;
}
