import { combineReducers } from 'redux';
import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';
import componentsFetchingObjectDataReducer from './componentsFetchingObjectData';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
  componentsFetchingObjectData: componentsFetchingObjectDataReducer,
  settings: settingsReducer,
})

export default rootReducer;