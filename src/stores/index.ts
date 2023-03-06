/**
 * A Redux store instance that is configured with the root reducer and thunk middleware.
 * @module store
*/
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './rootReducers';

/**
 * The Redux store instance that holds the complete state tree of the application.
 * @type {object}
*/
const store = configureStore({
  reducer,  // The root reducer function
  middleware: [thunk] // The middleware chain to be added to the store
});

// Export the store instance for use in the application
export default store;
