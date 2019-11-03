import { append } from "ramda";

const pageStateReducer = (
  invokeRequest: any = { selectedObjects: [], pageIsMoving: false },
  action: any
): any => {
  switch (action.type) {
    case 'SET_SELECTED':
      const { pageComponentId, externalId, isSelected } = action.payload;

      if (isSelected) {
        const objectExists = invokeRequest.selectedObjects.find(
          (obj: any) => obj.externalId === externalId
        );

        if (!objectExists) {
          return {
            ...invokeRequest,
            selectedObjects: append({externalId, pageComponentId}, invokeRequest.selectedObjects)
          }
        }
        return invokeRequest;
      }

      return {
        ...invokeRequest,
        selectedObjects: invokeRequest.selectedObjects.filter(
          (obj: any) => obj.externalId !== externalId
        )
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