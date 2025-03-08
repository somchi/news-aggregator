'use client';

import { useContext, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ArticleCategories, ArticleSources } from '@/app/utils/constants';
import { AppContext } from '@/app/context/provider';
import {
  CLEAR_FILTER,
  SET_FILTER_CATEGORIES,
  SET_FILTER_DATE,
  SET_FILTER_SOURCES,
} from '@/app/context/reducer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  buildQueryString,
  formatArticleDate,
  paramsToObject,
} from '@/app/utils/helper';
export const Filter = () => {
  const { state, dispatch } = useContext(AppContext);
  const [show, setShow] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toggleShow = () => {
    setShow(!show);
  };

  const handleClear = () => {
    toggleShow();
    dispatch({
      type: CLEAR_FILTER,
      payload: {
        categories: [],
        sources: [],
        dateFrom: undefined,
        dateTo: undefined,
      },
    });
    const query = paramsToObject(searchParams);
    if (query.search) {
      const queryString = buildQueryString({ search: query.search });
      router.replace(`${pathname}?${queryString}`);
    } else {
      router.replace(pathname);
    }
  };
  const handleApply = () => {
    toggleShow();

    const filters = {
      ...(state.sources.length > 0 && { source: state.sources }),
      ...(state.categories.length > 0 && { categories: state.categories }),
      ...(state.dateFrom && { dateFrom: formatArticleDate(state.dateFrom) }),
      ...(state.dateTo && { dateTo: formatArticleDate(state.dateTo) }),
    };
    const query = { ...paramsToObject(searchParams), ...filters };
    const queryString = buildQueryString(query);
    router.replace(`${pathname}?${queryString}`);
  };

  const handleSourceChange = (value: string) => {
    const data = state.sources.includes(value)
      ? state.sources.filter((item) => item !== value)
      : [...state.sources, value];
    dispatch({
      type: SET_FILTER_SOURCES,
      payload: { sources: data },
    });
  };

  const handleCatChange = (value: string) => {
    const data = state.categories.includes(value)
      ? state.categories.filter((item) => item !== value)
      : [...state.categories, value];
    dispatch({
      type: SET_FILTER_CATEGORIES,
      payload: { categories: data },
    });
  };

  const handleDateChange = (selected: DateRange) => {
    dispatch({
      type: SET_FILTER_DATE,
      payload: {
        ...(selected.from && { dateFrom: selected.from }),
        ...(selected.from && { dateFrom: selected.to }),
      },
    });
  };

  return (
    <div className={`${state.search ? 'flex' : 'hidden'} flex-col`}>
      <div
        className="flex items-center gap-1 p-3 rounder border border-gray-200"
        onClick={toggleShow}
      >
        <svg height="12px" version="1.1" viewBox="0 0 18 12" width="18px">
          <g fill="none" fill-rule="evenodd" stroke="none" strokeWidth="1">
            <g
              fill="currentColor"
              id="all-filters"
              transform="translate(-3.000000, -6.000000)"
            >
              <path
                d="M10,18 L14,18 L14,16 L10,16 L10,18 Z M3,6 L3,8 L21,8 L21,6 L3,6 Z M6,13 L18,13 L18,11 L6,11 L6,13 Z"
                id="Shape"
              ></path>
            </g>
          </g>
        </svg>
        <span className="text-font-medium">Filter</span>
      </div>
      {show && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg mx-2 p-6 w-full max-w-lg relative h-[calc(100vh-100px)] overflow-scroll">
            <div className="flex justify-between items-center border-b pb-3 cursor-pointer">
              <h2 className="text-lg font-semibold">Filter search</h2>
              <button
                onClick={toggleShow}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-y-4 gap-x-6 mt-4">
              <div className="grid md:flex gap-4">
                <div className="flex flex-col gap-2 md:w-1/2 w-full">
                  <h1 className="font-semibold text-sm">By Source</h1>
                  <div className="flex flex-wrap gap-3">
                    {ArticleSources.map((source, ind) => (
                      <div key={ind} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          onChange={() => handleSourceChange(source)}
                          defaultValue={source}
                          checked={state.sources.includes(source)}
                        />
                        <p className="text-sm">{source}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:w-1/2 w-full">
                  <h1 className="font-semibold text-sm">By Category</h1>
                  <div className="flex flex-wrap gap-3">
                    {ArticleCategories.map((category, ind) => (
                      <div key={ind} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          onChange={() => handleCatChange(category)}
                          checked={state.categories.includes(category)}
                        />
                        <p className="text-sm">{category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <h1 className="font-semibold text-sm">By Date</h1>
                <DayPicker
                  mode="range"
                  selected={{ from: state.dateFrom, to: state.dateTo }}
                  onSelect={handleDateChange}
                  disabled={{ after: new Date() }}
                  className="grid w-[300px] border border-gray-300"
                  classNames={{
                    months: 'flex space-y-4',
                    month: 'space-y-4',
                    caption_label: 'text-sm font-semibold mt-3 ml-2',
                    day: 'h-2 w-2 p-0 font-normal bg-white text-theme-dark hover:text-blue-400',
                  }}
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-2 justify-between">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white"
              >
                Clear
              </button>
              <div className="flex space-x-2 justify-end">
                <button
                  onClick={toggleShow}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
