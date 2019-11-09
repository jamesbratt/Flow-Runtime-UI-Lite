import { navigationRequest } from '../utils/flowClient';

/**
 * @param objectDataRequest payload to send when making an objectdata request.
 * This is derived from the component data provided by the engine invoke response.
 * 
 * @param pageComponentId
 * @description Tells the engine to fetch objectdata derived from a service
 * e.g. Salesorce, for a specific component (one that leverages service data)
 */
export const fetchNavigationData = (
  navigationElementId: string
) => {
  return async (dispatch: Function, getState: Function) => {

    const { pageState, settings } = getState();
    const manywhotenant = settings.tenantId;
    const { stateId, stateToken } = pageState.invokeResponse;

    const navigationPayload = {
      navigationElementId,
      stateId,
      stateToken,
    }

    try {
      const navigationResponse: any = await navigationRequest(
        manywhotenant, navigationPayload,
      );
  
      dispatch({
        type: 'SET_NAVIGATION',
        payload: { navigation: navigationResponse.data, id: navigationElementId }        
      })
  
    } catch(error) {
      console.log(error);
    }
  }
}