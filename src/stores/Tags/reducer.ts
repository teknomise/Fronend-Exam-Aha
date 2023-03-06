/**
 * Defines the types and interfaces used in the Tags feature of the application.
 * @module Tags/types
*/
import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE,
    TagsAction,
    Tag,
  } from './types';
  
  /**
   * The shape of the state for the Tags feature in the Redux store.
  */
  export interface TagsState {
    tags: Tag[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: TagsState = {
    tags: [],
    loading: false,
    error: null,
  };
  
  /**
   * The reducer function for the Tags feature in the Redux store.
   * @param {TagsState} state - The current state of the Tags feature.
   * @param {TagsAction} action - The action being dispatched to the reducer.
   * @return {TagsState} The new state of the Tags feature.
  */

  export default function tagsReducer(state = initialState, action: TagsAction): TagsState {
    switch (action.type) {
      // fetch data tags from store
      case FETCH_TAGS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      // fetch data from api then add to store
      case FETCH_TAGS_SUCCESS:
        return {
          ...state,
          tags: action.payload,
          loading: false,
          error: null,
        };
      // fetch failure return message error
      case FETCH_TAGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };