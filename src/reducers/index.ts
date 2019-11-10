import { combineReducers } from 'redux';

import pageStateReducer from './pageState';
import componentRegistyReducer from './componentRegistry';
import settingsReducer from './settings';
import navigationReducer from './navigation';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  pageState: pageStateReducer,
  componentRegistry: componentRegistyReducer,
  settings: settingsReducer,
  navigations: navigationReducer,
  notifications: notificationsReducer,
})

export default rootReducer;