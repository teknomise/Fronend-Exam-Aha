export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_USERS = 'SET_USERS';
export const SET_ERROR = 'SET_ERROR';

/**
 * Action type for setting the page size for search results.
 */
interface SetPageSizeAction {
  type: typeof SET_PAGE_SIZE;
  payload: {
    pageSize: number;
  };
}

/**
 * Action type for setting the keyword to use for searching.
 */
interface SetKeywordAction {
  type: typeof SET_KEYWORD;
  payload: {
    keyword: string;
  };
}

/**
 * Action type for setting the search results.
 */
export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: {
    users: any[];
  };
}

/**
 * Action type for setting an error message for the search.
 */
export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
}

/**
 * Union type of all possible search actions.
 */
export type SearchActionTypes = SetPageSizeAction | SetKeywordAction | SetUsersAction | SetErrorAction;

/**
 * Interface for the search state.
 */
export interface SearchState {
  pageSize: number;
  keyword: string;
  users: any[];
  error: string;
}
