import { Action } from 'redux';

/**
 * Defines the shape of the follow state.
*/
export type FollowState = {
  followers: any
  following: any,
  isLoading: boolean,
  fetchError: string | null
}

/**
 * Defines the constant strings for the action types.
*/
export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
export const FETCH_FOLLOWING = 'FETCH_FOLLOWING';
export const BEFORE_FETCH = 'BEFORE_FETCH';
export const FETCH_ERROR = 'FETCH_ERROR';

/**
 * Defines an interface for the FetchFollowersAction type of action.
 * @property {typeof FETCH_FOLLOWERS} type - The action type.
 * @property {FollowState['followers']} payload - The followers data.
*/
export interface FetchFollowersAction extends Action<typeof FETCH_FOLLOWERS> {
  payload: FollowState['followers'];
}

/**
 * Defines an interface for the FetchFollowingAction type of action.
 * @property {typeof FETCH_FOLLOWING} type - The action type.
 * @property {FollowState['following']} payload - The following data.
*/
export interface FetchFollowingAction extends Action<typeof FETCH_FOLLOWING> {
  payload: FollowState['following'];
}

/**
 * Defines an interface for the BeforeFetchAction type of action.
 * @property {typeof BEFORE_FETCH} type - The action type.
*/
export interface BeforeFetchAction extends Action<typeof BEFORE_FETCH> {}

/**
 * Defines an interface for the FetchErrorAction type of action.
 * @property {typeof FETCH_ERROR} type - The action type.
 * @property {FollowState['fetchError']} payload - The error message.
*/
export interface FetchErrorAction extends Action<typeof FETCH_ERROR> {
  payload: FollowState['fetchError'];
}

/**
 * Defines a union type of all the possible action types.
*/
export type FollowActionType =
  | FetchFollowersAction
  | FetchFollowingAction
  | BeforeFetchAction
  | FetchErrorAction;

