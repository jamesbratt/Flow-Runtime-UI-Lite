const pageStructureReducer = (
  state = {},
  action: any
): any => {
  switch (action.type) {
    case 'SET_FLOW':
      return action.payload
    default:
      return state
  }
}

export default pageStructureReducer;