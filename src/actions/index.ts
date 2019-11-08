import { InvokeResponse, objectDataRequest, mapElementInvokeResponses, pageComponentDataResponses } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';
import { invokeType, objectData } from '../interfaces/common';
import { initializationRequest, invokeRequest, serviceDataRequest } from '../utils/flowClient';

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

export const setSelected = (pageComponentId: string, externalId: string, isSelected: boolean, outcomeId: string) => {
  return {
    type: 'SET_SELECTED_OBJECT_DATA',
    payload: { pageComponentId, externalId, isSelected, outcomeId }
  }
}

export const setContentValue = (pageComponentId: string, contentValue: string | number) => {
  return {
    type: 'SET_CONTENT_VALUE',
    payload: { pageComponentId, contentValue }
  }
}

export const clickOutcome = (outcomeId: string) => {
  return {
    type: 'SET_OUTCOME',
    payload: { outcomeId }
  }
}

export const initializeFlow = (id: string, versionId: string, manywhotenant: string) => {
  return async (dispatch: Function) => {

    try {
      const initializationResponse: ServerResponse = await initializationRequest(
        id, versionId, manywhotenant,
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
}

export const moveFlow = (manywhotenant: string) => {
  return async (dispatch: Function, getState: Function) => {
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
        selectedOutcomeId: pageState.isMoving,
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
