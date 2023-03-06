import { SET_PAGE_SIZE, SET_KEYWORD, SET_USERS, SET_ERROR, SearchActionTypes, SearchState } from './types';

/**
 * Defines the initial state of the search reducer.
 * @typedef {Object} SearchState
 * @property {number} pageSize - The number of users to be displayed per page.
 * @property {string} keyword - The keyword used to search for users.
 * @property {Object[]} users - The list of users that match the search criteria.
 * @property {string} error - The error message if there was an error retrieving the users.
*/
export const initialState: SearchState = {
  pageSize: 3,
  keyword: '',
  users: [],
  error: '',
};

// Define the search reducer function
export default function searchReducer(state = initialState, action: SearchActionTypes): SearchState {
  switch (action.type) {
    // Update the page size in the state
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };
    // Update the search keyword in the state
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    // Update the list of users in the state
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        error: '',
      };
    // Update the error message in the state
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    // Return the current state if no action is matched
    default:
      return state;
  }
}