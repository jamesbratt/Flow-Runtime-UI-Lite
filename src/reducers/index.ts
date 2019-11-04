import { combineReducers } from 'redux';
import pageStructureReducer from './pageStructure';
import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';

const rootReducer = combineReducers({
  pageStructure: pageStructureReducer,
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
})

export default rootReducer;