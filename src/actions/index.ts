import axios from 'axios';

const baseUrl = 'https://flow.manywho.com';

export const setFlow = (invokeResponse: any) => {
  return {
    type: 'SET_FLOW',
    payload: invokeResponse
  }
}

export const setSelected = (pageComponentId: any, externalId: string, isSelected: boolean, outcomeId: string) => {
  return {
    type: 'SET_SELECTED',
    payload: { pageComponentId, externalId, isSelected, outcomeId }
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
    const { pageState, pageStructure } = getState();
    const {
      currentMapElementId,
      stateId,
      stateToken,
      invokeType,
      annotations,
      geoLocation,
      mode
    } = pageStructure;

    const invokeResponse: any = {
      invokeType,
      stateId,
      stateToken,
      currentMapElementId,
      annotations,
      geoLocation,
      mapElementInvokeRequest: {
        pageRequest: {
          pageComponentInputResponses: pageStructure.mapElementInvokeResponses.pageResponse.pageComponentDataResponses.map((component: any) => {
            return {
              objectData: component.objectData ? component.objectData.filter((od: any) => od.isSelected) : null,
              contentValue: component.contentValue,
              pageComponentId: component.pageComponentId,
            }
          }),
        },
        selectedOutcomeId: pageState.pageIsMoving,
      },
      mode,
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
