import { BEFORE_FETCH, FETCH_ERROR, FETCH_FOLLOWERS, FETCH_FOLLOWING, FollowActionType, FollowState } from "./types";

/**
 * Defines the initial state of the followReducer.
 * @typedef {Object} FollowState
 * @property {any[]} followers - The followers of the user.
 * @property {any[]} following - The users that the user is following.
 * @property {boolean} isLoading - Indicates if a fetch process is in progress.
 * @property {string | null} fetchError - The error message if an error occurred while fetching data.
*/
export const initialState: FollowState = {
  followers: [],
  following: [],
  isLoading: false,
  fetchError: null
}

/**
 * Handles actions related to fetching followers and following.
 * @param {FollowState} state - The current state.
 * @param {FollowActionType} action - The action to be performed.
 * @returns {FollowState} The new state.
*/
const followReducer = (state = initialState, action: FollowActionType): FollowState => {
  // Use a switch statement to handle each type of action
  switch (action.type) {
    /*
     * Sets isLoading to true to indicate that a fetch process is in progress.
     * @type {BEFORE_FETCH}
     * @returns {FollowState} The new state.
    */
    case BEFORE_FETCH:
      return {
        ...state,
        isLoading: true
      }

    /**
     * Adds the fetched followers to the followers array in state and sets isLoading to false to indicate that the fetch process is complete.
     * @type {FETCH_FOLLOWERS}
     * @param {any[]} action.payload - The fetched followers.
     * @returns {FollowState} The new state.
    */
    case FETCH_FOLLOWERS:
      return {
        ...state,
        followers: [...state.followers, ...action.payload],
        isLoading: false
      }

    /**
     * Adds the fetched following to the following array in state and sets isLoading to false to indicate that the fetch process is complete.
     * @type {FETCH_FOLLOWING}
     * @param {any[]} action.payload - The fetched following.
     * @returns {FollowState} The new state.
    */
    case FETCH_FOLLOWING:
      return {
        ...state,
        following: [...state.following, ...action.payload],
        isLoading: false
      }
    
    /**
     * Sets isLoading to false and updates the fetchError message in state.
     * @type {FETCH_ERROR}
     * @param {string} action.payload - The error message.
     * @returns {FollowState} The new state.
    */
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        fetchError: action.payload
      }
    
      /**
       * If the action is not recognized, returns the current state unchanged.
       * @returns {FollowState} The current state.
      */
    default:
      return state;
  }
}

// Export the followReducer as the default export of this module
export default followReducer;
