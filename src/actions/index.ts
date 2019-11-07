import axios from 'axios';
import { InvokeResponse } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';

const baseUrl = 'https://flow.manywho.com';

export const setFlow = (invokeResponse: any) => {
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
  return async (dispatch: any) => {

    try {
      const initializationResponse: any = await axios.post(
        `${baseUrl}/api/run/1/state`, {
          id,
          versionId
        },
        { headers: { manywhotenant } }
      ).catch(error => {
        throw Error(error.response.data)
      });

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
  return async (dispatch: any, getState: any) => {
    const { pageState } = getState();
    const {
      currentMapElementId,
      stateId,
      stateToken,
      invokeType,
      annotations,
    }: InvokeResponse = pageState.invokeResponse;

    const invokeResponse = {
      invokeType,
      stateId,
      stateToken,
      currentMapElementId,
      annotations,
      geoLocation: null,
      mapElementInvokeRequest: {
        pageRequest: {
          pageComponentInputResponses: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentDataResponses.map((component: any) => {
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
      const moveResponse: any = await axios.post(
        `${baseUrl}/api/run/1/state/${stateId}`,
        invokeResponse,
        { headers: { manywhotenant } }
      ).catch(error => {
        throw Error(error.response.data)
      });

      dispatch(
        setFlow(moveResponse.data)
      )

    } catch(error) {
      console.log(error);
    }
  }
}

export const fetchServiceData = (manywhotenant: string, objectDataRequest: any, pageComponentId: string) => {
  return async (dispatch: any) => {
    try {
      const objectDataResponse: any = await axios.post(
        `${baseUrl}/api/service/1/data`,
        objectDataRequest,
        { headers: { manywhotenant } }
      ).catch(error => {
        throw Error(error.response.data)
      });
  
      dispatch({
        type: 'SET_SERVICE_DATA',
        payload: { objectDataResponse: objectDataResponse.data, pageComponentId }        
      })
  
    } catch(error) {
      console.log(error);
    }
  }
}
