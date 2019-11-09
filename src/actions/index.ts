import { InvokeResponse, objectDataRequest, mapElementInvokeResponses, pageComponentDataResponses } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';
import { invokeType, objectData } from '../interfaces/common';
import { joinRequest, initializationRequest, invokeRequest, runRequest, serviceDataRequest } from '../utils/flowClient';

interface ServerResponse {
  data: any
}

const baseUrl = 'https://flow.manywho.com';

export const setFlow = (invokeResponse: InvokeResponse) => {
  return {
    type: 'SET_FLOW',
    payload: invokeResponse
  }
}

export const setSelected = (
  pageComponentId: string,
  externalId: string,
  isSelected: boolean,
  outcomeId: string,
  manywhotenant: string,
) => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState } = getState();
    const {
      currentMapElementId,
      stateId,
      stateToken,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

    const { pageComponentDataResponses } = selectedMapElementInvokeResponse.pageResponse;

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
    }).map((component: pageComponentDataResponses) => {
      return {
        objectData: component.objectData ? component.objectData.filter((od: objectData) => od.isSelected) : null,
        contentValue: component.contentValue,
        pageComponentId: component.pageComponentId,
      }
    });

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
      console.log(error);
    }
  }
}

export const setContentValue = (pageComponentId: string, contentValue: string | number) => {
  return {
    type: 'SET_CONTENT_VALUE',
    payload: { pageComponentId, contentValue }
  }
}

export const isLoading = () => {
  return {
    type: 'IS_LOADING',
    payload: true
  }
}

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

    if (id && versionId && manywhotenant) {
      try {
        const runResponse = await runRequest(id, versionId, manywhotenant);

        const { currentMapElementId, stateId, stateToken } = runResponse.data;

        const requestPayload = {
          currentMapElementId,
          stateId,
          stateToken,
          mapElementInvokeRequest: {},
          invokeType: invokeType.FORWARD,
        }

        const initializationResponse: ServerResponse = await invokeRequest(
          stateId, manywhotenant, requestPayload,
        );
  
        const joinUri = initializationResponse.data.joinFlowUri.replace(baseUrl, '');
        history.pushState(null, '', joinUri);
  
        dispatch(
          setFlow(initializationResponse.data)
        )
  
      } catch(error) {
        console.log(error);
      }
    }

    if (stateIdToJoin && !id && !versionId && manywhotenant) {
      try {
        const initializationResponse: ServerResponse = await joinRequest(
          stateIdToJoin, manywhotenant,
        );
  
        dispatch(
          setFlow(initializationResponse.data)
        )
  
      } catch(error) {
        console.log(error);
      }
    }
  }
}

export const clickOutcome = (manywhotenant: string, outcomeId: string) => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState } = getState();
    const {
      currentMapElementId,
      stateId,
      stateToken,
      annotations,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

    const { pageComponentDataResponses } = selectedMapElementInvokeResponse.pageResponse;

    const requestPayload: InvokeRequest = {
      invokeType: invokeType.FORWARD,
      stateId,
      stateToken,
      currentMapElementId,
      annotations,
      geoLocation: null,
      mapElementInvokeRequest: {
        pageRequest: {
          pageComponentInputResponses: pageComponentDataResponses.map((component: any) => {
            return {
              objectData: component.objectData ? component.objectData.filter((od: any) => od.isSelected) : null,
              contentValue: component.contentValue,
              pageComponentId: component.pageComponentId,
            }
          }),
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
        stateId, manywhotenant, requestPayload,
      );

      dispatch(
        setFlow(moveResponse.data)
      )

    } catch(error) {
      console.log(error);
    }
  }
}

export const syncFlow = (manywhotenant: string) => {
  return async (dispatch: Function, getState: Function) => {

    dispatch(
      isLoading()
    );

    const { pageState } = getState();
    const {
      currentMapElementId,
      stateId,
      stateToken,
      annotations,
      selectedMapElementInvokeResponse,
    } = pageState.invokeResponse;

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

      const syncedData = syncResponse.data.mapElementInvokeResponses.find(
        (response: mapElementInvokeResponses) => response.mapElementId === syncResponse.data.currentMapElementId
      ).pageResponse.pageComponentDataResponses
      .reduce((obj: any, data: pageComponentDataResponses) => Object.assign(obj, { [data.pageComponentId]: data }), {})

      dispatch({
        type: 'SET_COMPONENT_DATA',
        payload: { syncedData }        
      })

    } catch(error) {
      console.log(error);
    }
  }
}

export const fetchServiceData = (
  manywhotenant: string,
  objectDataRequest: objectDataRequest,
  pageComponentId: string
) => {
  return async (dispatch: Function) => {

    dispatch({
      type: 'IS_COMPONENT_FETCHING_SERVICE_DATA',
      payload: {
        isLoading: true,
        pageComponentId,
      }       
    })

    try {
      const objectDataResponse: ServerResponse = await serviceDataRequest(
        manywhotenant, objectDataRequest,
      );
  
      dispatch({
        type: 'SET_SERVICE_DATA',
        payload: { objectDataResponse: objectDataResponse.data, pageComponentId }        
      })
  
    } catch(error) {
      console.log(error);
    }
  }
}
