import { append } from "ramda";

const pageStateReducer = (
  invokeRequest: any = { pageComponents: [], pageIsMoving: false },
  action: any
): any => {
  switch (action.type) {
    case 'SET_SELECTED':
      const { pageComponentId } = action.payload; 
      return {
        ...invokeRequest,
        pageComponents: append(pageComponentId, invokeRequest.pageComponents)
      }
    /*
    case 'SET_FLOW': {
      const {
        invokeType,
        stateId,
        stateToken,
        currentMapElementId,
        annotations,
        geoLocation,
        mode,
      } = action.payload;

      const initialPageState = {
        invokeType,
        stateId,
        stateToken,
        currentMapElementId,
        annotations,
        geoLocation,
        mapElementInvokeRequest: {
          pageRequest: {
            pageComponentInputResponses: []
          },
          selectedOutcomeId: null,
        },
        mode,
        selectedMapElementId: null,
        navigationElementId: null,
        selectedNavigationElementId: null
      };

      return {
        pageIsMoving: false,
        state: initialPageState
      }
    }*/
    default:
      return invokeRequest
  }
}

export default pageStateReducer;