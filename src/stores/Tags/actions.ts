/**
 * Actions for fetching tags from the server.
 * @module Tags/actions
*/
import { ThunkAction } from 'redux-thunk';
import rootReducer from '../rootReducers';
import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  TagsAction,
  Tag,
} from './types';
import { getTags } from '../../services/api';

/**
  * Action creator for a request to fetch tags.
  * @function
  *@returns {TagsAction} An action object representing the request to fetch tags.
*/
export const fetchTagsRequest = (): TagsAction => ({
  type: FETCH_TAGS_REQUEST,
});

/**
 * Action creator for a successful tag fetch.
 * @function
 * @param {Tag[]} tags - The tags fetched from the server.
 * @returns {TagsAction} An action object representing the successful fetch of tags.
*/
export const fetchTagsSuccess = (tags: Tag[]): TagsAction => ({
  type: FETCH_TAGS_SUCCESS,
  payload: tags,
});

/**
 * Action creator for a failed tag fetch.
 * @function
 * @param {string} error - The error message returned from the server.
 * @returns {TagsAction} An action object representing the failed fetch of tags.
*/
export const fetchTagsFailure = (error: string): TagsAction => ({
  type: FETCH_TAGS_FAILURE,
  error,
});

/**
 * Asynchronous action creator for fetching tags from the server.
 * @function
 * @returns {ThunkAction<void, typeof rootReducer, unknown, TagsAction>} A thunk action that dispatches the relevant action creators.
*/
export const fetchTags = (): ThunkAction<void, typeof rootReducer, unknown, TagsAction> => async (dispatch) => {
  try {
    dispatch(fetchTagsRequest());
    const tags = await getTags();
    dispatch(fetchTagsSuccess(tags));
  } catch (error) {
    if (typeof error === 'string') {
      dispatch(fetchTagsFailure(error));
    } else {
      dispatch(fetchTagsFailure('An error occurred while fetching tags.'));
    }
  }
};



