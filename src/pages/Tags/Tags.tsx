/**
 * A React component that displays a list of tags retrieved from the server.
 * @class
 * @param {PropsFromRedux} props - The props passed to the component.
 * @return {JSX.Element} A JSX element representing the Tags component.
*/
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Navbar from '../../components/Navbar';
import rootReducer from '../../stores/rootReducers';
import { ThunkDispatch } from 'redux-thunk';
import { fetchTags } from '../../stores/Tags/actions';
import { Tag } from '../../stores/Tags/types';
import { NavLink } from 'react-router-dom';
import IconBack from '../../assets/images/icon-back.svg'
import './Tags.css';

// Map the redux state to component props
const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  tags: state.tags.tags,
  loading: state.tags.loading,
  error: state.tags.error,
});

// Map the redux dispatch to component props
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  fetchTags: () => dispatch(fetchTags()),
});

// Connect the component to the redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Get the props from the redux store
type PropsFromRedux = ConnectedProps<typeof connector>;

// Define the component props
type IProps = PropsFromRedux;

/**
 * A React component that represents the Tags page of the application.
 * It renders a list of tags fetched from the backend API.
 * @class
 * @param {IProps} props - The props passed down to the component.
 */
class App extends React.Component<IProps> {

  /**
   * Fetches tags from the server when the component mounts.
   */
  componentDidMount() {
    this.props.fetchTags();
  }

  /**
   * Renders a list of tags.
   * @param {Tag[]} tags - The array of tags to render.
   * @return {JSX.Element} A JSX element representing the list of tags.
   */
  renderTagsList = (tags: Tag[]) => {
    return (
      <div className="row scrollable-y pt-4 tags-mobile">
        {tags.map((tag) => (
        <div className="column" key={tag.id}>
          <div className="card">
            <div className='tag-outline'>
              {tag.name}
            </div>
          </div>
          <div className='tag-name'>{tag.name}</div>
          <div className='tag-count'>{tag.count} Results</div>
        </div>
        ))}
      </div>
    );
  };

  /**
   * Renders the Tags component.
   * @returns {JSX.Element} - A JSX element representing the Tags component.
   */
  render() {
    const { tags, loading, error } = this.props;
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <div className="col-sm min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="content-wrapper-2">
                      <div className='back-tab d-none d-sm-block'>
                        <NavLink to="/" className='back-icon'>
                            <img src={IconBack} alt="icon-back" />
                        </NavLink>
                        <span className='d-none d-sm-block'>Home Page</span>
                      </div>
                      <h1>Tags</h1>
                      { loading 
                        ? (<div className='loader loader-position'></div>) 
                        : this.renderTagsList(tags)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default connector(App);
