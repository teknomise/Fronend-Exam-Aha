
import axios from "axios";
import { FETCH_FOLLOWERS, FETCH_FOLLOWING, BEFORE_FETCH, FETCH_ERROR, FollowState, FetchFollowersAction, FetchErrorAction, FetchFollowingAction } from "./types";
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

// Define a type alias for the thunk action to make it easier to read and understand
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  FollowState,
  unknown,
  Action<string>
>;

/**
 * Action creator that fetches followers from API using axios.
 * @param page The page to fetch.
 * @returns The promise with void.
*/
export const fetchFollowers = (page: number): AppThunk<Promise<void>> => async (dispatch) => {
  // Dispatch a BEFORE_FETCH action to indicate that the fetch process has started
  dispatch({ type: BEFORE_FETCH });
  try {
    // Make an HTTP GET request to the appropriate API endpoint
    const followers = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=20`);
    // If the request is successful, dispatch a FETCH_FOLLOWERS action with the paginated data returned by the API
    dispatch<FetchFollowersAction>({ type: FETCH_FOLLOWERS, payload: followers.data.data });
  } catch (error) {
    // If the request fails (due to a network error or an error response from the server), dispatch a FETCH_ERROR action with the error message
    if (axios.isAxiosError(error)) {
      dispatch<FetchErrorAction>({ type: FETCH_ERROR, payload: error.message });
    }
  }
};

/**
 * Action creator that fetches following from API using axios.
 * @param page The page to fetch.
 * @returns The promise with void.
*/
export const fetchFollowing = (page: number): AppThunk<Promise<void>> => async (dispatch) => {
  // Dispatch a BEFORE_FETCH action to indicate that the fetch process has started
  dispatch({ type: BEFORE_FETCH });
  try {
    // Make an HTTP GET request to the appropriate API endpoint
    const following = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/users/friends?page=${page}&pageSize=20`);
    // If the request is successful, dispatch a FETCH_FOLLOWING action with the paginated data returned by the API
    dispatch<FetchFollowingAction>({ type: FETCH_FOLLOWING, payload: following.data.data });
  } catch (error) {
    // If the request fails (due to a network error or an error response from the server), dispatch a FETCH_ERROR action with the error message
    if (axios.isAxiosError(error)) {
      dispatch<FetchErrorAction>({ type: FETCH_ERROR, payload: error.message });
    }
  }
};
