/**
* The root reducer for the Redux store. It combines all reducers for different parts of the application.
* @module
*/
import { combineReducers } from "redux";
import followReducer from "./Follow/reducer";
import searchReducer from "./Search/reducer";
import tagsReducer from "./Tags/reducer";


/**
 * The combined reducer function that combines all reducers for different parts of the application.
 * @function
 * @returns {Object} The combined reducer object.
*/
const rootReducer = combineReducers({
  follow: followReducer,
  search: searchReducer,
  tags: tagsReducer

});

export default rootReducer;
