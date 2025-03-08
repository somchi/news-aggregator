'use client';

import { createContext, useReducer } from 'react';
import { Action, AppStore, Preferences } from '../utils/types';
import { appReducer } from './reducer';

const InitialState: AppStore = {
  categories: [],
  sources: [],
  dateFrom: undefined,
  dateTo: undefined,
  showMenu: false,
  search: '',
  preferences: {} as Preferences,
};

export const AppContext = createContext<{
  state: AppStore;
  dispatch: React.Dispatch<Action>;
}>({ state: InitialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
