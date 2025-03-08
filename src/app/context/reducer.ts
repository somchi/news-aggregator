import { Action, AppStore } from '../utils/types';

export const SET_FILTER_SOURCES = 'SET_FILTER_SOURCES';
export const SET_FILTER_CATEGORIES = 'SET_FILTER_CATEGORIES';
export const SET_FILTER_DATE = 'SET_FILTER_DATE';
export const SET_SHOW_MENU = 'SET_SHOW_MENU';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_USER_PREFERENCES = 'SET_USER_PREFERENCES';

export const appReducer = (state: AppStore, action: Action): AppStore => {
  switch (action.type) {
    case SET_FILTER_CATEGORIES:
      return { ...state, categories: action.payload.categories ?? [] };
    case SET_FILTER_DATE:
      return {
        ...state,
        ...(action.payload.dateFrom && {
          dateFrom: action.payload.dateFrom,
        }),
        ...(action.payload.dateTo && {
          dateTo: action.payload.dateTo,
        }),
      };
    case SET_FILTER_SOURCES:
      return { ...state, sources: action.payload.sources ?? [] };
    case SET_SHOW_MENU:
      return { ...state, showMenu: action.payload.showMenu ?? false };
    case CLEAR_FILTER:
      return {
        ...state,
        categories: [],
        sources: [],
        dateFrom: undefined,
        dateTo: undefined,
      };
    case SET_SEARCH:
      return { ...state, search: action.payload.search ?? '' };
    case SET_USER_PREFERENCES: {
      return { ...state, preferences: action.payload.preferences ?? {} };
    }
    default:
      return state;
  }
};
