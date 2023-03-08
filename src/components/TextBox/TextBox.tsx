/**
 * A textbox component that allows users to search for content based on keyword and set number of results per page.
 * @param {Object} props - The props object containing the component's properties.
 * @param {string} props.keyword - The keyword entered by the user in the search textbox.
 * @param {function} props.setKeyword - A function that sets the search keyword in the store.
 * @param {Object} props.searchState - The current state of the search store.
 * @returns {JSX.Element} - A JSX element representing the textbox component.
 */
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setKeyword } from '../../stores/Search/actions';
import { SearchActionTypes, SearchState } from '../../stores/Search/types';
import rootReducer from '../../stores/rootReducers';
import Slider from '../Slider';
import { useNavigate } from 'react-router-dom';
// import CustomSlider from '../Slider/CustomSlider'

/**
 * Maps the state properties to the component's props.
 * @param state - The root state of the application.
 * @returns {Object} - An object containing the state properties to be mapped to the component's props.
 */
const mapState = (state: ReturnType<typeof rootReducer>) => {
  return {
    keyword: state.search.keyword,
    searchState: state.search
  };
};

/**
 * Maps the dispatch actions to the component's props.
 * @param dispatch - The dispatch function.
 * @returns {Object} - An object containing the dispatch actions to be mapped to the component's props.
 */
const mapDispatchToProps = (dispatch: ThunkDispatch<SearchState, unknown, SearchActionTypes>) => ({
  setKeyword: (keyword: string, searchState: SearchState) => dispatch(setKeyword(keyword, searchState)),
});

// Connecting the component to the store
const connector = connect(mapState, mapDispatchToProps);

// Creating the interface for the props received from Redux
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * The `TextboxProps` interface extends `PropsFromRedux` to include an additional property `searchState` of type `SearchState`.
 */
interface TextboxProps extends PropsFromRedux {
  searchState: SearchState;
}

/**
 * The TextBox component.
 * @param {TextboxProps} props - The props for the component.
 */
const TextBox: React.FC<TextboxProps> = ({ keyword, setKeyword, searchState }) => {

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handles a change in the keyword input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value, searchState);
  };

  /**
   * Handles the search action.
   * Gets the input element by its id, sets the keyword to the value of the input element, and navigates to the search results page.
   * @return void
  */
  const handleSearch = () => {
    const inputElement = document.getElementById("search") as HTMLInputElement;
    const keyword = inputElement.value ? inputElement.value : "a";
    setKeyword(keyword, searchState);
    navigate('/search');
  }

  /**
   * This component displays a search bar and a slider to control number of search results per page
   * It receives the keyword and searchState props from Redux, which are used to update the search keyword
   * when the user inputs a new value
   * It also receives the setKeyword and searchState props from Redux, which are used to update the keyword state
   * and perform the search when the user clicks on the search button
   * It uses the useNavigate hook from React Router to redirect the user to the search results page
   * when the search button is clicked.
   */

  return (
    <div className='pt-3 pb-2'>
      <input
        id='search'
        className='form-control form-control-lg bg-transparent'
        type='text'
        placeholder='Keyword'
        aria-label='.form-control-lg'
        value={keyword}
        onChange={handleKeywordChange}
      />
      <hr className='separation' />
      <h2 className='text-white pt-2 text-label-1'># Of Results Per Page</h2>
      <Slider />
      {/* <CustomSlider /> */}
      <hr className='separation d-none d-md-block d-lg-block' />
      <div className='button-bottom'>
        <hr className='separation separation-mobile d-none d-sm-block' />
        <button className='btn btn-light' type='button' onClick={handleSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default connector(TextBox);
