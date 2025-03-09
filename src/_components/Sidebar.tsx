'use client';

import { useContext, useEffect, useState } from 'react';
import { Authors } from './Authors';
import { Categories } from './Categories';
import { Sources } from './Sources';
import { AppContext } from '@/app/context/provider';
import { SET_USER_PREFERENCES } from '@/app/context/reducer';

export const Sidebar = () => {
  const { state, dispatch } = useContext(AppContext);
  const [sources, setSources] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const preferences = localStorage.getItem('preferences');
      if (!preferences) return;
      const preferenceData = JSON.parse(preferences);

      setAuthors(preferenceData.authors ?? []);
      setCategories(preferenceData.categories ?? []);
      setSources(preferenceData.source ?? []);
      dispatch({
        type: SET_USER_PREFERENCES,
        payload: { preferences: preferenceData },
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleClear = () => {
    dispatch({
      type: SET_USER_PREFERENCES,
      payload: {
        preferences: {},
      },
    });
    setAuthors([]);
    setCategories([]);
    setSources([]);
    localStorage.removeItem('preferences');
  };
  const handleApply = () => {
    const preferences = {
      ...(sources.length > 0 && { source: sources }),
      ...(categories.length > 0 && { categories: categories }),
      ...(authors.length > 0 && { authors: authors }),
    };
    dispatch({
      type: SET_USER_PREFERENCES,
      payload: {
        preferences,
      },
    });
    localStorage.setItem('preferences', JSON.stringify(preferences));
  };

  const handleSourceChange = (value: string) => {
    const data = sources.includes(value)
      ? sources.filter((item) => item !== value)
      : [...sources, value];
    setSources(data);
  };

  const handleCategoryChange = (value: string) => {
    const data = categories.includes(value)
      ? categories.filter((item) => item !== value)
      : [...categories, value];
    setCategories(data);
  };

  const handleAuthorChange = (value: string) => {
    const data = authors.includes(value)
      ? authors.filter((item) => item !== value)
      : [...authors, value];
    setAuthors(data);
  };

  return (
    <div
      className={`w-full right-0 mt-2 md:mt-0 md:mr-0 md:w-2/6 md:relative absolute top-0 bg-white md:z-0 
    z-10 md:rounded-xl shadow px-6 py-6 md:grid ${
      state.showMenu ? 'grid' : 'hidden'
    }`}
    >
      <div className="flex flex-col">
        <h3 className="font-bold mb-2">My Preference</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Source</h1>
            <Sources
              sources={sources}
              handleSourceChange={handleSourceChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Author</h1>
            <Authors
              authors={authors}
              handleAuthorChange={handleAuthorChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Category</h1>
            <Categories
              categories={categories}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-2 justify-between">
          <div className="flex space-x-2 justify-end">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
