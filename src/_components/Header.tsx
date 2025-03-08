'use client';

import { AppContext } from '@/app/context/provider';
import { SET_SHOW_MENU } from '@/app/context/reducer';
import { useContext } from 'react';

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleMenu = () => {
    dispatch({ type: SET_SHOW_MENU, payload: { showMenu: !state.showMenu } });
  };
  return (
    <header className="flex items-center gap-x-3 bg-slate-700 p-4">
      <div
        className="flex flex-col items-center justify-center rounded border h-8 w-8 border-gray-300"
        onClick={handleMenu}
      >
        {state.showMenu ? (
          <span className="text-white">X</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'white' }}
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        )}
      </div>
      <h1 className="text-white">News Aggregator</h1>
    </header>
  );
};
