import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import rootReducer from '../../stores/rootReducers';
import Navbar from '../../components/Navbar';
import Navtabs from '../../components/Navtabs';
import Follows from '../../components/Follows';
import { setUsers } from '../../stores/Search/actions';
import { SearchState } from '../../stores/Search/types';
import { getUsers } from '../../services/api';
import IconBack from '../../assets/images/icon-back.svg'
import { NavLink } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-image.png';
import DefaultImage3 from '../../assets/images/default-image-3.png';
import './SearchResult.css';


/**
* Maps the state from Redux store to component's props
*/
const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  keyword: state.search.keyword,
  users: state.search.users,
  pageSize: state.search.pageSize,
});

/**
* Maps dispatch actions to component's props
*/
const mapDispatchToProps = (dispatch: ThunkDispatch<SearchState, unknown, any>) => ({
  setUsers: (users: any[]) => dispatch(setUsers(users)),
});

/**
* Connects the component with Redux store using the defined mappings
*/
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPageResultState {
  activeTab: string;
  screenWidth: number;
  visibleCount: number;
  isLoading: boolean;
}

/**
* Search result page component that displays a list of users based on the search query
*/
class SearchResult extends React.Component<PropsFromRedux, IPageResultState> {
  constructor(props: PropsFromRedux) {
    super(props);
  
    // Set initial state for the component
    this.state = {
      activeTab: 'Followers', // The currently active tab
      screenWidth: window.innerWidth, // The current width of the screen
      visibleCount: 9, // The number of users to display initially
      isLoading: true, // Indicates if the component is currently loading data from the API
    };
  
    // Bind method to component instance
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  async componentDidMount() {
    // Get required data from props
    const { pageSize, keyword, setUsers } = this.props;
  
    // Get users from API
    const users = await getUsers(1, pageSize, keyword);
  
    // Update state with received data and set isLoading to false
    setUsers(users);
    this.setState({ isLoading: false });
  
    // Add event listener for screen resize
    window.addEventListener('resize', this.handleScreenResize);
  }

  componentWillUnmount() {
    // Remove event listener for screen resize
    window.removeEventListener('resize', this.handleScreenResize);
  }
  
  /**
   * Handler function for screen resize event.
   * Updates the screenWidth state value.
   */
  handleScreenResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };
  
  /**
   * Handler function for tab change event.
   * Updates the activeTab state value.
   * @param {string} tab - The id of the selected tab.
   */
  handleTabChange(tab: string) {
    this.setState({ activeTab: tab });
  }

  /**
   * Handler function for image loading error event.
   * Updates the source of the image to a default image.
   * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - The event object.
   */
  handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = DefaultImage;
  };

  /**
   * Handler function for 'more' button click event.
   * Increases the visibleCount state value by 9.
   */
  handleMoreClick = () => {
    this.setState((prevState) => ({
      visibleCount: prevState.visibleCount + 9,
    }));
  };

  /**
   * Renders the users based on the current state and props
   * @returns JSX.Element|null - The JSX code for the users
  */
  renderUsers() {
    const { users } = this.props;
    const { visibleCount } = this.state;

    if (!users) {
      return null;
    }

    const visibleUsers = users.slice(0, visibleCount);

    return (
      <>
        {visibleUsers.map((user) => (
          <div className="result-component col-sm-12 col-md-4 col-lg-4" key={user.id}>
            <img className="img-result" src={DefaultImage3} alt={user.name} onError={this.handleImageError} />
            <h3>{user.name}</h3>
            <small>by {user.username}</small>
          </div>
        ))}
        {users.length > visibleCount && (
          <div className="result-component col-sm-12 col-md-4 col-lg-4">
            <button className="btn btn-light" onClick={this.handleMoreClick}>
              MORE
            </button>
          </div>
        )}
      </>
    );
  }
  
  renderNone() {
    return (
      <div className='result-not-found'>
        No results found
      </div>
    );
  }

  /**
   * A React component that renders the search results page.
   * It displays the search results, with a fallback message if there are none.
   * Additionally, it renders the follow list component based on screen width.
   * @component
   * @param {Object} props - The props passed to the component.
   * @param {Object[]} props.users - The array of user objects returned by the search.
   * @param {number} state.screenWidth - The width of the screen.
   * @param {boolean} state.isLoading - Indicates whether or not the search results are still loading.
   * @param {string} state.activeTab - The currently active tab in the follow list.
   * @returns {JSX.Element} - A JSX element representing the component.
  */

  render() {
    const { users } = this.props;
    const { screenWidth, isLoading } = this.state;
    return (
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <div className="col-sm min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <div className="content-wrapper content-result">
                      <div className='back-tab'>
                        <NavLink to="/" className='back-icon'>
                            <img src={IconBack} alt="icon-back" />
                        </NavLink>
                        <span className='d-none d-md-block d-lg-block'>Results</span>
                        <span className='d-none d-sm-block'>Home Page</span>
                      </div>
                      <div className='title-shown-mobile'>
                          <h2>Results</h2>
                      </div>
                      <div className='row results'>
                        {isLoading ? (
                          <div className='loader loader-position'></div>
                        ) : users ? (
                          this.renderUsers()
                        ) : (
                          this.renderNone()
                        )}
                      </div>
                    </div>
                  </div>
                  {
                    screenWidth >= 1440 
                    ? (
                        <div className="col-md-4 pr-0">
                          <div className="follows">
                            <Navtabs activeTab={this.state.activeTab} onChangeTab={this.handleTabChange} />
                            <Follows activeTab={this.state.activeTab} isFetching={false} />
                          </div>
                        </div>
                      )
                    : (
                        <></>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default connector(SearchResult);
