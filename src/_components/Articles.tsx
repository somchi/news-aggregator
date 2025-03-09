'use client';

import {
  getGuardianArticles,
  getNewsAPIArticles,
  getNYTArticles,
} from '@/app/utils/data-fetch';
import { Article } from './Article';
import {
  aggregateData,
  buildQueryString,
  paginate,
  queryParams,
} from '@/app/utils/helper';
import { Article as ArticleType, SearchParams } from '@/app/utils/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ArticleLoader } from './ArticleLoader';
import { AppContext } from '@/app/context/provider';
import { Paginator } from './Paginator';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  searchParams: SearchParams;
};
export const Articles = ({ searchParams }: Props) => {
  const [paging, setPaging] = useState<{ page: number; total: number }>({
    page: 1,
    total: 0,
  });
  const [data, setData] = useState<ArticleType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();

  const fetchData = useCallback(async () => {
    setLoader(true);

    const params = queryParams(searchParams, state.preferences);
    const nyt = getNYTArticles(params);
    const guardian = getGuardianArticles(params);
    const newsApi = getNewsAPIArticles(params);
    const [nytResponse, guardianRes, newspiRes] = await Promise.all([
      nyt,
      guardian,
      newsApi,
    ]);
    let nytSource = [];
    let guardianSource = [];
    let newsSource = [];
    if (nytResponse.status === 200) {
      nytSource = nytResponse.data.response.docs;
    }
    if (guardianRes.status === 200) {
      guardianSource = guardianRes.data.response.results;
    }
    if (newspiRes.status === 200) {
      newsSource = newspiRes.data.articles;
    }

    const data = aggregateData(nytSource, newsSource, guardianSource);
    setLoader(false);
    setData(data);
    const totalPages = paginate([
      newspiRes.data?.totalResults ?? 0,
      guardianRes.data.response?.total ?? 0,
      nytResponse.data.response?.meta?.hits ?? 0,
    ]);

    setPaging({
      page:
        searchParams.page && typeof searchParams.page === 'string'
          ? parseInt(searchParams.page)
          : 1,
      total: totalPages,
    });
  }, [searchParams, state.preferences]);

  useEffect(() => {
    const dataFetch = async () => {
      await fetchData();
    };

    dataFetch();
  }, [fetchData, searchParams]);

  const handleChange = (page: number) => {
    setPaging({ ...paging, page });
    const params = { ...searchParams, page: page.toString() };
    const query = buildQueryString(params);
    router.replace(`${pathname}/?${query}`);
  };

  return (
    <div className="h-full">
      {loader ? (
        <ArticleLoader />
      ) : (
        <div className="flex flex-col h-full relative">
          {data.length > 0 ? (
            <div className="flex flex-col">
              <div className="flex flex-wrap my-10 gap-3 h-[calc(100vh-250px)] overflow-scroll w-full">
                {data.map((item, ind) => (
                  <Article article={item} key={ind} />
                ))}
              </div>
              <Paginator
                currentPage={paging.page}
                totalPages={paging.total}
                onPageChange={handleChange}
              />
            </div>
          ) : (
            <div className="flex flex-col self-center items-center absolute top-1/3 left-1/2">
              <div className="flex justify-center items-center border-red-500 rounded-full h-12 w-12 border-2">
                <p className="text-center font-semibold text-red-500">!</p>
              </div>
              <h2 className="text-red-500 text-2xl">No result found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
