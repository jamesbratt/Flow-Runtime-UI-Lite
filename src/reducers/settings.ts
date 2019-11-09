import {
  componentsFetchingObjectDataActionTypes,
  SET_SERVICE_DATA,
  IS_COMPONENT_FETCHING_SERVICE_DATA,
} from '../actions/types';

const settingsReducer = (
  settings: Object = {
    flowId: null,
    flowVersionId: null,
    tenantId: window.location.pathname.split('/')[1],
  },
  action: any
): any => {
  return settings
}

export default settingsReducer;