/**
 * This component represents a slider that allows the user to select the number of search results to display per page.
 * It is connected to the redux store to access and update the page size.
 * @param {Object} props - The component props.
 * @param {number} props.pageSize - The current number of search results per page.
 * @param {function} props.setPageSize - A function to update the number of search results per page.
 * @returns {JSX.Element} - A JSX Element representing the Slider component.
*/
import { ChangeEvent, FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import rootReducer from '../../stores/rootReducers';
import { setPageSize } from '../../stores/Search/actions';
import { SearchState } from '../../stores/Search/types';
import { SearchActionTypes } from '../../stores/Search/types';
import './Slider.css';

// Mapping the pageSize state from the store to props
const mapState = (state: ReturnType<typeof rootReducer>) => ({
  pageSize: state.search.pageSize,
});

/**
 * Maps the dispatch actions to the component's props.
 * @param dispatch - The dispatch function.
 */
const mapDispatchToProps = (dispatch: ThunkDispatch<SearchState, unknown, SearchActionTypes>) => ({
  setPageSize: (value: number) => dispatch(setPageSize(value)),
});

// Connecting the component to the store
const connector = connect(mapState, mapDispatchToProps);

// Creating the interface for the props received from Redux
type PropsFromRedux = ConnectedProps<typeof connector>;

// Creating the interface for the component's props
interface SliderProps extends PropsFromRedux {
}

// The slider component
const Slider: FC<SliderProps> = ({ pageSize, setPageSize }) => {

  /**
   * A callback function to handle the change event on the slider.
   * It receives an event object and updates the page size in the redux store.
   * @param {ChangeEvent<HTMLInputElement>} event - The change event object.
  */
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPageSize(value);
  }, [setPageSize]);


  /**
   * A callback function to get the background position of the slider based on the page size.
   * It receives the current page size and returns a string representing the background position.
   * @param {number} value - The current page size.
   * @returns {string} - A string representing the background position of the slider.
  */
  const getBackground = useCallback((value: number) => {
    return `${((value - 3) / 47) * 100}% 100%`;
  }, []);

  return (
    <>
      {/* Display current page size */}
      <div className="show-value">
        <span className="big">{pageSize}</span> <span className="small">results</span>
      </div>

      {/* Range slider */}
      <div className="range-slider">
        <input
          type="range"
          min={3}
          max={50}
          step={pageSize < 40 ? 3 : 1}
          value={pageSize}
          onChange={handleChange}
          className="slider"
          style={{ backgroundSize: getBackground(pageSize) }}
          data-testid="slider"
        />

        {/* Labels for slider range */}
        <div className="range-labels">
          {[3, 6, 9, 12, 15, 50].map((value) => (
            <span key={value} className="range-label">
              {value}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};


// Exporting the connected component
export default connector(Slider);