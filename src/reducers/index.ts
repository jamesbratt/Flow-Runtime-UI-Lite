import { combineReducers } from 'redux';
import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';
import componentsFetchingObjectDataReducer from './componentsFetchingObjectData';

const rootReducer = combineReducers({
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
  componentsFetchingObjectData: componentsFetchingObjectDataReducer,
})

export default rootReducer;