/**
  * Follows component displays a list of either the followers or the following of a user
  * It receives the following props:
  * activeTab (string): indicates which tab is currently active, either "Followers" or "Following"
  * isFetching (boolean): indicates if data is currently being fetched
  * Redux props:
  *  - followers (array): an array of objects representing the followers of a user
  *  - following (array): an array of objects representing the following of a user
  *  - error (string): any error message that may have occurred during data fetching
  *  - loading (boolean): indicates if data is still being loaded from the API
  *  - fetchFollowers (function): Redux action to fetch followers from the API
  *  - fetchFollowing (function): Redux action to fetch following from the API
  * Other variables:
  *  - pgFollowers (number): indicates which page of followers is currently being displayed
  *  - pgFollowing (number): indicates which page of following is currently being displayed
  * scrollableAreaRef (React.RefObject): a reference to the scrollable area div
  * On mount, the component will fetch the followers and following from the API for the first page.
  * When the user scrolls to the bottom of the list, if there are more pages, it will load the next page of results.
  * If there are no more pages, it will do nothing.
  * If there is an error during data fetching, it will display an error message.
  * If data is still being loaded from the API, it will display a loader.
  * If there is no error and no data is being loaded, it will display the list of either the followers or following.
  */

import * as React from 'react';
import { FollowState } from '../../stores/Follow/types';
import { fetchFollowers, fetchFollowing } from '../../stores/Follow/actions';
import FollowList from './FollowList';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FollowActionType } from '../../stores/Follow/types';
import rootReducer from '../../stores/rootReducers';
import './Follows.css'

/**
 * A function that maps the redux state to component props.
 * @param {ReturnType<typeof rootReducer>} state - The current state of the redux store.
 * @returns {object} An object containing the mapped state values as component props.
*/
const mapState = (state: ReturnType<typeof rootReducer>) => {
  const { followers, following, fetchError, isLoading } = state.follow;
  return {
    followers: [...state.follow.followers, ...followers],
    following: [...state.follow.following, ...following],
    error: fetchError,
    loading: isLoading,
  };
};

/**
 * A function that maps the redux dispatch to component props.
 * @param {ThunkDispatch<FollowState, unknown, FollowActionType>} dispatch - The dispatch function to update the store state.
 * @returns {object} An object containing the mapped dispatch functions as component props.
*/
const mapDispatchToProps = (dispatch: ThunkDispatch<FollowState, unknown, FollowActionType>) => ({
  fetchFollowers: (page: number) => dispatch(fetchFollowers(page)),
  fetchFollowing: (page: number) => dispatch(fetchFollowing(page)),
});

// connector to connect the component to the redux store.
const connector = connect(mapState, mapDispatchToProps);

// type to define the component props from the redux store.
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Props for the Follows component that extends PropsFromRedux with the addition of activeTab and isFetching props.
 * @interface
 * @property {string} activeTab - The currently active tab, either "Followers" or "Following".
 * @property {boolean} isFetching - A flag indicating if data is currently being fetched from the server.
 * @extends PropsFromRedux
*/
interface FollowsProps extends PropsFromRedux {
  activeTab: string;
  isFetching: boolean;
}

const Follows: React.FC<FollowsProps> = ({
  fetchFollowers,
  fetchFollowing,
  followers,
  following,
  error,
  loading,
  isFetching,
  activeTab,
}) => {

  const [pgFollowers, setPgFollowers] = React.useState(1);
  const [pgFollowing, setPgFollowing] = React.useState(1);
  const scrollableAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isFetching) return;
      if (activeTab === 'Followers') {
        if (scrollableAreaRef.current && scrollableAreaRef.current.clientHeight + scrollableAreaRef.current.scrollTop === scrollableAreaRef.current.scrollHeight) {
          setPgFollowers(pgFollowers + 1);
          fetchFollowers(pgFollowers + 1);
        }
      } else {
        if (scrollableAreaRef.current && scrollableAreaRef.current.clientHeight + scrollableAreaRef.current.scrollTop === scrollableAreaRef.current.scrollHeight) {
          setPgFollowing(pgFollowing + 1);
          fetchFollowing(pgFollowing + 1);
        }
      }
    };
    const scrollableArea = scrollableAreaRef.current;
    if (scrollableArea) {
      scrollableArea.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollableArea) {
        scrollableArea.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchFollowers, fetchFollowing, isFetching, activeTab, pgFollowers, pgFollowing]);

  React.useEffect(() => {
    fetchFollowers(1);
    fetchFollowing(1);
  }, [fetchFollowers, fetchFollowing]);

  if (loading) {
    return <div className='loader loader-position'></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (scrollableAreaRef.current) {
    scrollableAreaRef.current.scrollTop = 0;
  }

  return (
    <div>
      {activeTab === 'Followers' ? (
        <div className='scroll-area' ref={scrollableAreaRef}>
          <FollowList users={followers} />
        </div>
      ) : (
        <div className='scroll-area' ref={scrollableAreaRef}>
          <FollowList users={following} />
        </div>
      )}
    </div>
  );
};

export default connector(Follows);