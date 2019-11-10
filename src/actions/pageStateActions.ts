import { InvokeResponse, objectDataRequest, mapElementInvokeResponses, pageComponentDataResponses } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';
import { invokeType, objectData } from '../interfaces/common';
import { joinRequest, invokeRequest, runRequest, serviceDataRequest } from '../utils/flowClient';
import { setNotification } from './notificationActions';

import {
  SET_FLOW,
  SET_CONTENT_VALUE,
  IS_LOADING,
  SET_SERVICE_DATA,
  SET_COMPONENT_DATA,
  IS_COMPONENT_FETCHING_SERVICE_DATA,
} from '../actions/types';

interface ServerResponse {
  data: any
}

const baseUrl = 'https://flow.manywho.com';

/**
 * 
 * @param invokeResponse 
 * @description A dump of the engines invoke response
 */
export const setFlow = (invokeResponse: InvokeResponse) => {
  return {
    type: SET_FLOW,
    payload: invokeResponse
  }
}

/**
 * 
 * @param pageComponentId 
 * @param contentValue 
 * @description Sets the contentValue of a specified page component
 */
export const setContentValue = (pageComponentId: string, contentValue: string | number) => {
  return {
    type: SET_CONTENT_VALUE,
    payload: { pageComponentId, contentValue }
  }
}

/**
 * @description Something asynchronous is happening...
 */
export const isLoading = () => {
  return {
    type: IS_LOADING,
    payload: true
  }
}

/**
 * @description Gets triggered when the root React component has mounted.
 * Initialization can either invoke a new Flow "state" (thats state on the engine side...
 * so a new instance of a running Flow) or join an existing state.
 * 
 * The logic is based on GET parameters specified in the url.
 * So if a flow ID and version ID are specifed, then the UI will assume you
 * want to invoke a new state for that Flow.
 * 
 * If no flow ID or version ID are specified, but a "join" parameter is
 * specified, its value being a state ID, then that existing state is
 * joined.
 */
export const initializeFlow = () => {
  return async (dispatch: Function) => {

    dispatch(
      isLoading()
    );

    const currentUrl = window.location;
    const urlParams = new URLSearchParams(currentUrl.search);

    const stateIdToJoin = urlParams.get('join');
    const id = urlParams.get('flow-id');
    const versionId = urlParams.get('flow-version-id');
    const manywhotenant = currentUrl.pathname.split('/')[1];

    // We assume the user wants to create a new state...
    if (id && versionId && manywhotenant) {
      try {

        // The run response gives us the new state ID and state token
        // which is needed when making the very first invoke request
        const runResponse = await runRequest(id, versionId, manywhotenant);

        const { currentMapElementId, stateId, stateToken } = runResponse.data;

        const requestPayload = {
          currentMapElementId,
          stateId,
          stateToken,
          mapElementInvokeRequest: {},
          invokeType: invokeType.FORWARD,
        }

        // Make the invoke requests, the response of which will
        // tell the UI what it needs to render
        const initializationResponse: ServerResponse = await invokeRequest(
          stateId, manywhotenant, requestPayload,
        );
  
        // Update the url to a "join" url, so that if the page
        // is refreshed in the browser a new state isnt invoked
        const joinUri = initializationResponse.data.joinFlowUri.replace(baseUrl, '');
        history.pushState(null, '', joinUri);
  
        // Set the invoke response in state
        dispatch(
          setFlow(initializationResponse.data)
        )
  
      } catch(error) {
        dispatch(
          setNotification(error)
        )
      }
    }

    // We assume the user wants to join an existing state
    if (stateIdToJoin && !id && !versionId && manywhotenant) {
      try {

        // Go ahead and make an invoke request with the
        // state ID specifed in the url
        const initializationResponse: ServerResponse = await joinRequest(
          stateIdToJoin, manywhotenant,
        );
  
        // Set the invoke response in state
        dispatch(
          setFlow(initializationResponse.data)
        )
  
      } catch(error) {
        dispatch(
          setNotification(error)
        )
      }
    }

    if (!stateIdToJoin && !id && !versionId && !manywhotenant) {
      dispatch(
        setNotification('No Flow ID, Flow version ID or state ID have been specified as GET parameters in the URL')
      )
    }
  }
}

/**
 * 
 * @param manywhotenant The tenant ID
 * @param outcomeId A GUID identifying an outcome
 * @description Typically triggered by the user clicking an outcome.
 * We check the page component data that is currently in page state
 * before constructing an invoke request payload to give to the engine
 * to tell it what has changed in the current Flow state.
 */
export const moveFlow = (outcomeId: string) => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState, settings } = getState();
    const manywhotenant = settings.tenantId;
    const {
      currentMapElementId,
      stateId,
      stateToken,
      annotations,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

    // The component data that is currently in page state
    const { pageComponentDataResponses } = selectedMapElementInvokeResponse.pageResponse;

    /**
     * When contructing the invoke request payload, the most
     * important thing is what is being assigned to the mapElementInvokeRequest.
     * For every page component in the UI page state, the engine is only concerned
     * with knowing its contentValue, ID and objectdata... interestingly 
     * when it comes to objectdata the engine is really fussy - we should only specify
     * objects that have been marked as selected (and I guess if any of its properties have changed).
     * You cannot just give it a components entire objectdata else you get a really
     * unhelpful error.
     */
    const requestPayload: InvokeRequest = {
      invokeType: invokeType.FORWARD,
      stateId,
      stateToken,
      currentMapElementId,
      annotations,
      geoLocation: null,
      mapElementInvokeRequest: {
        pageRequest: {

          // Telling the engine whats changed
          pageComponentInputResponses: pageComponentDataResponses.map((component: any) => {
            return {
              objectData: component.objectData ? component.objectData.filter((od: any) => od.isSelected) : null,
              contentValue: component.contentValue,
              pageComponentId: component.pageComponentId,
            }
          }),
        },

        // Telling the engine where we want to go next in the Flow
        selectedOutcomeId: outcomeId,
      },
      mode: null,
      selectedMapElementId: null,
      navigationElementId: null,
      selectedNavigationElementId: null
    };

    try {
      const moveResponse: ServerResponse = await invokeRequest(
        stateId, manywhotenant, requestPayload,
      );

      dispatch(
        setFlow(moveResponse.data)
      )

    } catch(error) {
      dispatch(
        setNotification(error)
      )
    }
  }
}

/**
 * 
 * @param pageComponentId GUID representing a page component
 * @param externalId An ID representing a single objectdata
 * @param isSelected 
 * @param outcomeId 
 * 
 * @description Sometimes we need to move through a Flow based on an objectdata
 * selection that has been made. An example of this would be when there is an
 * outcome bound to every row in a table. In which case we need to specify the object
 * (or row) that has been selected when constructing the invoke request payload.
 */
export const moveWithSelection = (
  pageComponentId: string,
  externalId: string,
  isSelected: boolean,
  outcomeId: string,
) => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState, settings } = getState();
    const manywhotenant = settings.tenantId;
    const {
      currentMapElementId,
      stateId,
      stateToken,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

    // The component data that is currently in page state
    const { pageComponentDataResponses } = selectedMapElementInvokeResponse.pageResponse;

    /**
     * So here we are setting the specific object for the page component
     * to marked as selected, before sending the payload off to the engine
     */
    const pageComponentInputResponses = pageComponentDataResponses.map((component: pageComponentDataResponses) => {
      if (component.pageComponentId === pageComponentId) {
        return {
          ...component,
          objectData: component.objectData.map((od: objectData) => {
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

    // Remember... the engine only wants objects marked as selected - so fussy :-)
    }).map((component: pageComponentDataResponses) => {
      return {
        objectData: component.objectData ? component.objectData.filter((od: objectData) => od.isSelected) : null,
        contentValue: component.contentValue,
        pageComponentId: component.pageComponentId,
      }
    });

    // Construct the invoke response
    // TODO: this can probably abstracted in some way,
    // as this is the second time I am doing this.
    const requestPayload: InvokeRequest = {
      invokeType: invokeType.FORWARD,
      stateId,
      stateToken,
      currentMapElementId,
      annotations: null,
      geoLocation: null,
      mapElementInvokeRequest: {
        pageRequest: {
          pageComponentInputResponses,
        },
        selectedOutcomeId: outcomeId,
      },
      mode: null,
      selectedMapElementId: null,
      navigationElementId: null,
      selectedNavigationElementId: null
    };

    try {
      const moveResponse: ServerResponse = await invokeRequest(
        pageState.invokeResponse.stateId, manywhotenant, requestPayload,
      );

      dispatch(
        setFlow(moveResponse.data)
      )

    } catch(error) {
      dispatch(
        setNotification(error)
      )
    }
  }
}

/**
 * @description As far as I am aware, a sync request is only ever needed
 * for when a page condition is triggered. Essentially, we tell the engine
 * what page component data has changed and it responds with giving as all the page component
 * data back again. Which may well have changed depending on what the engine received.
 * No information is given back as to what page components are to be rendered
 * by the UI as it is only the component data that is changed. 
 */
export const syncFlow = () => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState, settings } = getState();
    const manywhotenant = settings.tenantId;
    const {
      currentMapElementId,
      stateId,
      stateToken,
      annotations,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

    // Same old... see comments in above actions ^^
    const { pageComponentDataResponses } = selectedMapElementInvokeResponse.pageResponse;

    const requestPayload: InvokeRequest = {
      invokeType: invokeType.SYNC,
      stateId,
      stateToken,
      currentMapElementId,
      annotations,
      geoLocation: null,
      mapElementInvokeRequest: {
        pageRequest: {
          pageComponentInputResponses: pageComponentDataResponses.map((component: pageComponentDataResponses) => {
            return {
              objectData: component.objectData ? component.objectData.filter((od: objectData) => od.isSelected) : null,
              contentValue: component.contentValue,
              pageComponentId: component.pageComponentId,
            }
          }),
        },

        // Oh yeah, we dont need this as we
        // just want to stay on the current page
        selectedOutcomeId: null,
      },
      mode: null,
      selectedMapElementId: null,
      navigationElementId: null,
      selectedNavigationElementId: null
    };

    try {
      const syncResponse: ServerResponse = await invokeRequest(
        stateId, manywhotenant, requestPayload,
      );

      // The page component data updates that we are actually interested in
      // are nested in a load of junk. So this is just for convenience
      // so that it is easy for the reducer to just do a deep merge with the page component
      // data currently in state.
      const syncedData = syncResponse.data.mapElementInvokeResponses.find(
        (response: mapElementInvokeResponses) => response.mapElementId === syncResponse.data.currentMapElementId
      ).pageResponse.pageComponentDataResponses
      .reduce((obj: any, data: pageComponentDataResponses) => Object.assign(obj, { [data.pageComponentId]: data }), {})

      dispatch({
        type: SET_COMPONENT_DATA,
        payload: { syncedData }        
      })

    } catch(error) {
      dispatch(
        setNotification(error)
      )
    }
  }
}

/**
 * @param objectDataRequest payload to send when making an objectdata request.
 * This is derived from the component data provided by the engine invoke response.
 * 
 * @param pageComponentId
 * @description Tells the engine to fetch objectdata derived from a service
 * e.g. Salesorce, for a specific component (one that leverages service data)
 */
export const fetchServiceData = (
  objectDataRequest: objectDataRequest,
  pageComponentId: string
) => {
  return async (dispatch: Function, getState: Function) => {

    const { settings } = getState();
    const manywhotenant = settings.tenantId;

    try {
      const objectDataResponse: ServerResponse = await serviceDataRequest(
        manywhotenant, objectDataRequest,
      );
  
      dispatch({
        type: SET_SERVICE_DATA,
        payload: { objectDataResponse: objectDataResponse.data, pageComponentId }        
      })
  
    } catch(error) {
      dispatch(
        setNotification(error)
      )
    }
  }
}
