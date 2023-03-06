import { Dispatch } from 'redux';
import { SET_PAGE_SIZE, SET_KEYWORD, SET_USERS, SET_ERROR, SearchActionTypes, SetUsersAction, SetErrorAction, SearchState} from './types';

/**
 * Action creator to set the page size in search state.
 * @param {number} pageSize - The new page size.
 * @return {Function} - A function that accepts a dispatch method from Redux Thunk middleware.
 */
export const setPageSize = (pageSize: number) => (dispatch: Dispatch<SearchActionTypes>) => {
  dispatch({
    type: SET_PAGE_SIZE,
    payload: {
      pageSize,
    },
  });
};

/**
 * Action creator to set the search keyword in search state.
 * @param {string} keyword - The new search keyword.
 * @param {SearchState} state - The current search state.
 * @return {Function} - A function that accepts a dispatch method from Redux Thunk middleware.
 */
export const setKeyword = (keyword: string, state: SearchState) => async (dispatch: Dispatch<SearchActionTypes>) => {
  dispatch({
    type: SET_KEYWORD,
    payload: {
      keyword,
    },
  });
};

/**
 * Action creator to set the users in search state.
 * @param {any[]} users - The array of users to set.
 * @return {SetUsersAction} - An action object with type and payload properties.
 */
export const setUsers = (users: any[]): SetUsersAction => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

/**
 * Action creator to set the error message in search state.
 * @param {string} error - The error message to set.
 * @return {SetErrorAction} - An action object with type and payload properties.
 */
export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: {
    error,
  },
});