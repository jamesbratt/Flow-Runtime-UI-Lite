import axios from 'axios';

const baseUrl = 'https://flow.manywho.com';

export const setFlow = (invokeResponse: any) => {
  return {
    type: 'SET_FLOW',
    payload: invokeResponse
  }
}

export const makeSelection = (pageComponent: any, outcomeId: string) => {
  return {
    type: 'MAKE_SELECTION',
    payload: { pageComponent, outcomeId }
  }
}

export const setSelected = (pageComponentId: any, externalId: string, isSelected: boolean) => {
  return {
    type: 'SET_SELECTED',
    payload: { pageComponentId, externalId, isSelected }
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
    const { currentMapElementId } = pageStructure;
    const mapElementInvokeResponse = pageStructure.mapElementInvokeResponses.find(
      (response: any) => response.mapElementId === currentMapElementId
    );

    try {
      const moveResponse: any = await axios.post(
        `${baseUrl}/api/run/1/state/${pageState.state.stateId}`,
        pageState.state,
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
