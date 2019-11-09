import assocPath from 'ramda/src/assocPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import append from 'ramda/src/append';

import {
  mapElementInvokeResponses,
  pageComponentDataResponses
} from '../interfaces/invokeResponse';

import {
  pageStructureActionTypes,
  SET_FLOW,
  IS_LOADING,
  SET_SERVICE_DATA,
  SET_COMPONENT_DATA,
  SET_CONTENT_VALUE,
} from '../actions/types';

const initialState = {
  invokeResponse: {
    selectedMapElementInvokeResponse: {
      pageResponse: {
        pageComponentDataResponses: null,
      },
    },
  },
  isFetchingServiceData: [],
  isLoading: false,
}

const pageStateReducer = (
  page: any = initialState,
  action: pageStructureActionTypes
): any => {
  switch (action.type) {
    case SET_COMPONENT_DATA: {
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { syncedData } = action.payload;

        return {
          ...page,
          isLoading: false,
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: pageComponentDataResponses) => {
              if (syncedData[component.pageComponentId]) {
                return mergeDeepLeft(syncedData[component.pageComponentId], component);
              } 
              return component
            }),
            page.invokeResponse,
          )
        }
      }
      break;
    }

    case SET_SERVICE_DATA:
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { pageComponentId, objectDataResponse } = action.payload;
        return {
          ...page,
          isLoading: false,
          isFetchingServiceData: page.isFetchingServiceData.filter(sd => sd.pageComponentId !== pageComponentId),
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: pageComponentDataResponses) => {
              if (component.pageComponentId === pageComponentId) {
                return mergeDeepLeft(objectDataResponse, component);
              } 
              return component
            }),
            page.invokeResponse,
          )
        }
      }
      break;

    case SET_CONTENT_VALUE: {
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { pageComponentId, contentValue } = action.payload;
        return {
          ...page,
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: pageComponentDataResponses) => {
              if (component.pageComponentId === pageComponentId) {
                return {
                  ...component,
                  contentValue,
                } 
              } 
              return component
            }),
            page.invokeResponse,
          )
        }
      }
      break;
    }

    case SET_FLOW: {
      if (action.payload.mapElementInvokeResponses) {
        const mapElementInvokeResponse = action.payload.mapElementInvokeResponses.find(
          (response: mapElementInvokeResponses) => response.mapElementId === action.payload.currentMapElementId
        );
        return {
          ...page,
          isLoading: false,
          invokeResponse: assocPath(['selectedMapElementInvokeResponse'], mapElementInvokeResponse, action.payload),
        }
      }
      break;
    }

    case IS_LOADING: {
      return {
        ...page,
        isLoading: action.payload,
      }
    }

    case 'IS_COMPONENT_FETCHING_SERVICE_DATA': {
      return {
        ...page,
        isFetchingServiceData: append(action.payload, page.isFetchingServiceData),
      }
    }
    default:
      return page
  }
}

export default pageStateReducer;