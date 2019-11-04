const pageStateReducer = (
  state: any = { pageIsMoving: null },
  action: any
): any => {
  switch (action.type) {
    case 'SET_SELECTED':
      return {
        ...state,
        pageIsMoving: action.payload.outcomeId
      }

    case 'SET_FLOW':
      return {
        ...state,
        pageIsMoving: null
      }
    default:
      return state
  }
}

export default pageStateReducer;