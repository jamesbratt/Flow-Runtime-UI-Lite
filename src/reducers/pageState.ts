import assocPath from 'ramda/src/assocPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

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
  isLoading: false,
}

/**
 * @param page Should look something like an invoke response (see the relevant interface)
 * @param action 
 */
const pageStateReducer = (
  page: InvokeResponse = initialState,
  action: pageStructureActionTypes
): any => {
  switch (action.type) {

    /**
     * This is when we have received a response from a sync request.
     * This typically occurs when a page condition is triggered.
     * Whats happening here is that we are updating all the existing
     * data for each page component e.g contentValue etc with the new
     * page component data that the engine has given back to us after syncing.
     */
    case SET_COMPONENT_DATA: {
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {

        // The new page component data
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

    /**
     * So whenever the UI fetches data for a component that leverages a service e.g Salesforce
     * the engine gives back a bunch of objectdata which needs to be poked into
     * the relevent page data response object so that the UI knows it now needs
     * to render this service data for the particular component.
     */
    case SET_SERVICE_DATA:
      const { pageComponentDataResponses } = page.invokeResponse.selectedMapElementInvokeResponse.pageResponse;
      if (pageComponentDataResponses) {
        const { pageComponentId, objectDataResponse } = action.payload;
        return {
          ...page,
          isLoading: false,
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

    /**
     * Simple - justs updates a components contentValue based on
     * whatever the user wants to set it to.
     */
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

    /**
     * Here, we are bunging the entire invoke response straight into state.
     * This happens when a Flow has been told to move "forward" and therefore
     * gets given a whole new bunch of instructions on what the engine wants
     * the UI to render.
     */
    case SET_FLOW: {
      if (action.payload.mapElementInvokeResponses) {

        /**
         * NOTE - We are adding this selectedMapElementInvokeResponse key just for convenience...
         * The invoke response contains an array of mapElementInvokeResponses, but in reality,
         * the UI only cares about the data contained within the mapElementInvokeResponse for
         * the current map element.
         */
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

    default:
      return page
  }
}

export default pageStateReducer;