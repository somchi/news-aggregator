'use client';

import {
  getGuardianArticles,
  getNewsAPIArticles,
  getNYTArticles,
} from '@/app/utils/data-fetch';
import { Article } from './Article';
import { aggregateData } from '@/app/utils/helper';
import { Article as ArticleType, SearchParams } from '@/app/utils/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ArticleLoader } from './ArticleLoader';
import { AppContext } from '@/app/context/provider';

type Props = {
  searchParams: SearchParams;
};
export const Articles = ({ searchParams }: Props) => {
  const [guardianData, setGuardianData] = useState([]);
  const [nytData, setNYTData] = useState([]);
  const [newsApiData, setNewsAPIData] = useState([]);
  const [data, setData] = useState<ArticleType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { state } = useContext(AppContext);

  const fetchData = useCallback(async () => {
    setLoader(true);
    const params =
      Object.keys(searchParams).length > 0
        ? searchParams
        : Object.keys(state.preferences).length > 0
        ? state.preferences
        : {};
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
    setGuardianData(guardianSource);
    setNYTData(nytSource);
    setNewsAPIData(newsSource);

    const data = aggregateData(nytSource, newsSource, guardianSource);
    setData(data);
    setLoader(false);
  }, [searchParams, state.preferences]);

  useEffect(() => {
    const dataFetch = async () => {
      await fetchData();
    };

    dataFetch();
  }, [fetchData, searchParams]);

  return (
    <div className="h-full">
      {loader ? (
        <ArticleLoader />
      ) : (
        <div className="flex flex-wrap gap-3 h-full w-full relative">
          {data.length > 0 ? (
            data.map((item, ind) => <Article article={item} key={ind} />)
          ) : (
            <div className="flex flex-col self-center items-center absolute top-1/3 left-2/4">
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
