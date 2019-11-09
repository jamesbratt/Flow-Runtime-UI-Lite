import { combineReducers } from 'redux';
import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';
import componentsFetchingObjectDataReducer from './componentsFetchingObjectData';
import settingsReducer from './settings';
import naviagationReducer from './navigation';

const rootReducer = combineReducers({
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
  componentsFetchingObjectData: componentsFetchingObjectDataReducer,
  settings: settingsReducer,
  navigations: naviagationReducer,
})

export default rootReducer;