import { append } from "ramda";

const pageStateReducer = (
  page: any = { pageIsMoving: false, state: {} },
  action: any
): any => {
  switch (action.type) {
    case 'MAKE_SELECTION': {
      const { pageComponentInputResponses } = page.state.mapElementInvokeRequest.pageRequest;
      const { pageComponentId } = action.payload.pageComponent;

      const componentExists = pageComponentInputResponses.find((pcir: any) => pcir.pageComponentId === pageComponentId);

      const updatedComponents = componentExists ? pageComponentInputResponses.map((pcir: any) => {
        if (pcir.pageComponentId === pageComponentId) {
          return action.payload.pageComponent;
        }
        return pcir;
      }) : append(action.payload.pageComponent, pageComponentInputResponses);

      return {
        ...page,
        state: {
          ...page.state,
          mapElementInvokeRequest: {
            pageRequest: {
              pageComponentInputResponses: updatedComponents
            },
            selectedOutcomeId: action.payload.outcomeId
          }
        },
        pageIsMoving: action.payload.outcomeId ? true : null
      }
    }

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
    }
    default:
      return page
  }
}

export default pageStateReducer;