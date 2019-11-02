import { combineReducers } from 'redux';
import pageStructureReducer from './pageStructure';
import pageStateReducer from './pageState';

const rootReducer = combineReducers({
  pageStructure: pageStructureReducer,
  pageState: pageStateReducer,
})

export default rootReducer;