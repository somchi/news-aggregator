'use client';

import { AppContext } from '@/app/context/provider';
import { CLEAR_FILTER, SET_SEARCH } from '@/app/context/reducer';
import { buildQueryString } from '@/app/utils/helper';
import { SearchParams } from '@/app/utils/types';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useEffect } from 'react';

export const SearchInput = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch({
        type: SET_SEARCH,
        payload: { search: searchParams.search?.toString() ?? '' },
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, searchParams]);

  const handleSearch = (formData: FormData) => {
    const value = formData.get('search') as string;

    if (value === '') {
      dispatch({ type: CLEAR_FILTER, payload: {} });
      router.replace(pathname);
    } else {
      const query = { ...searchParams, search: value };
      const queryString = buildQueryString(query);
      router.replace(`${pathname}?${queryString}`);
    }
  };

  const handleClear = () => {
    dispatch({
      type: SET_SEARCH,
      payload: { search: '' },
    });
    dispatch({ type: CLEAR_FILTER, payload: {} });
    router.replace(pathname);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: SET_SEARCH,
      payload: { search: value },
    });
  };

  return (
    <form
      className="flex border rounded-xl items-center border-gray-400"
      action={handleSearch}
    >
      <div className="relative w-11/12">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search by keywords..."
          className="w-full px-5 py-2 rounded-xl"
          defaultValue={searchParams.search ?? ''}
          value={state.search}
          onChange={handleChange}
        />
        {state.search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <span className="w-4 h-4 text-gray-400">X</span>
          </button>
        )}
      </div>

      <button className="px-3 border-l py-2 border-r-gray-400">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
            fill="#7D7E8B"
          />
          <path
            d="M22.0014 22.7499C21.8114 22.7499 21.6214 22.6799 21.4714 22.5299L19.4714 20.5299C19.1814 20.2399 19.1814 19.7599 19.4714 19.4699C19.7614 19.1799 20.2414 19.1799 20.5314 19.4699L22.5314 21.4699C22.8214 21.7599 22.8214 22.2399 22.5314 22.5299C22.3814 22.6799 22.1914 22.7499 22.0014 22.7499Z"
            fill="#7D7E8B"
          />
        </svg>
      </button>
    </form>
  );
};
