import assocPath from 'ramda/src/assocPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { InvokeResponse } from '../interfaces/invokeResponse';

import {
  pageStructureActionTypes,
  SET_FLOW,
  SET_SERVICE_DATA,
  SET_COMPONENT_DATA,
  SET_SELECTED_OBJECT_DATA,
  SET_CONTENT_VALUE,
  SET_OUTCOME,
} from '../actions/types';

interface pageState {
  invokeResponse: InvokeResponse
  isMoving: string | null
}

const initialState = {
  invokeResponse: {
    selectedMapElementInvokeResponse: {
      pageResponse: {
        pageComponentDataResponses: null,
      },
    },
  },
  isMoving: null,
  pendingServiceData: true,
}

const pageStateReducer = (
  page: pageState = initialState,
  action: pageStructureActionTypes
): any => {
  switch (action.type) {
    case SET_OUTCOME:
      return {
        ...page,
        isMoving: action.payload.outcomeId
    }

    case SET_COMPONENT_DATA: {
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { syncedData } = action.payload;

        return {
          ...page,
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: any) => {
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
          pendingServiceData: false,
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: any) => {
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
            pageComponentDataResponses.map((component: any) => {
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

    case SET_SELECTED_OBJECT_DATA: {
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { pageComponentId, externalId, isSelected, outcomeId } = action.payload;
        return {
          ...page,
          isMoving: outcomeId,
          invokeResponse: assocPath(
            ['selectedMapElementInvokeResponse', 'pageResponse', 'pageComponentDataResponses'],
            pageComponentDataResponses.map((component: any) => {
              if (component.pageComponentId === pageComponentId) {
                return {
                  ...component,
                  objectData: component.objectData.map((od: any) => {
                    if (od.externalId === externalId) {
                      return {
                        ...od,
                        isSelected: isSelected,
                      }
                    }
                    return  {
                      ...od,
                      isSelected: false,
                    }
                  })
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
          (response: any) => response.mapElementId === action.payload.currentMapElementId
        );
        return {
          ...page,
          isMoving: null,
          pendingServiceData: true,
          invokeResponse: assocPath(['selectedMapElementInvokeResponse'], mapElementInvokeResponse, action.payload),
        }
      }
      break;
    }
    default:
      return page
  }
}

export default pageStateReducer;