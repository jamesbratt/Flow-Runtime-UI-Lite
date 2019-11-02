const pageStateReducer = (
  state = {},
  action: any
): any => {
  switch (action.type) {
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

      return initialPageState
    }
    default:
      return state
  }
}

export default pageStateReducer;