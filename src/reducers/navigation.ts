import append from 'ramda/src/append';

const navigationReducer = (
  navigations: any = [],
  action: any
): any => {
  switch (action.type) {
    case 'SET_NAVIGATION':
      return append(action.payload, navigations)
  
    default:
      return navigations
  }
}

export default navigationReducer;