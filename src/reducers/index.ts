import { combineReducers } from 'redux';
import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';

const rootReducer = combineReducers({
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
})

export default rootReducer;