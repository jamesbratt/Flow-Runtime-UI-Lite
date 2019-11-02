import axios from 'axios';
import { assocPath } from 'ramda';

const baseUrl = 'https://flow.manywho.com';

export const setFlow = (invokeResponse: any) => {
  return {
    type: 'SET_FLOW',
    payload: invokeResponse
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

export const moveFlow = (outcomeId: string, manywhotenant: string) => {
  return async (dispatch: any, getState: any) => {
    const { pageState } = getState();
    const pageStateWithOutcomeSpecified = assocPath(
      ['mapElementInvokeRequest', 'selectedOutcomeId'],
      outcomeId,
      pageState
    );

    try {
      const moveResponse: any = await axios.post(
        `${baseUrl}/api/run/1/state/${pageState.stateId}`,
        pageStateWithOutcomeSpecified,
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
