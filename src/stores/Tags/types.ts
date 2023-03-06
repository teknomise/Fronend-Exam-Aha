/**
  The action type constant for fetching tags request.
*/
export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';

/**
  The action type constant for fetching tags success.
*/
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

/**
  The action type constant for fetching tags failure.
*/
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

/**
  The interface for the fetch tags request action.
  @interface
*/
export interface FetchTagsRequestAction {
  type: typeof FETCH_TAGS_REQUEST;
}

/**
  The interface for the fetch tags success action.
  @interface
  @property {typeof FETCH_TAGS_SUCCESS} type - The action type constant.
  @property {Tag[]} payload - The array of tags fetched from the server.
*/
export interface FetchTagsSuccessAction {
  type: typeof FETCH_TAGS_SUCCESS;
  payload: Tag[];
}

/**
  The interface for the fetch tags failure action.
  @interface
  @property {typeof FETCH_TAGS_FAILURE} type - The action type constant.
  @property {string} error - The error message.
*/
export interface FetchTagsFailureAction {
  type: typeof FETCH_TAGS_FAILURE;
  error: string;
}

/**
  The union type for all tags actions.
  @type {TagsAction}
*/
export type TagsAction =
  | FetchTagsRequestAction
  | FetchTagsSuccessAction
  | FetchTagsFailureAction;

/**
  The interface for a tag object.
  @interface
  @property {string} id - The id of the tag.
  @property {string} name - The name of the tag.
  @property {number} count - The number of times the tag is used.
*/
export interface Tag {
  id: string;
  name: string;
  count: number;
}
