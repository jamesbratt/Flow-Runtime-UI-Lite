import append from 'ramda/src/append';

import {
  componentsFetchingObjectDataActionTypes,
  SET_SERVICE_DATA,
  IS_COMPONENT_FETCHING_SERVICE_DATA,
} from '../actions/types';

const componentsFetchingObjectDataReducer = (
  components: Array<string> = [],
  action: componentsFetchingObjectDataActionTypes
): any => {
  switch (action.type) {

    // An objectdata request has been received so
    // the specified component is no longer waiting for its data
    case SET_SERVICE_DATA:
      return components.filter(componentId => componentId !== action.payload.pageComponentId)
    case IS_COMPONENT_FETCHING_SERVICE_DATA:
      return append(action.payload, components);

    default:
      return components
  }
}

export default componentsFetchingObjectDataReducer;