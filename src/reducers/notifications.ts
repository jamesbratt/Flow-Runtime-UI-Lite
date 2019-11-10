import append from 'ramda/src/append';

const notificationsReducer = (
  notifications: any = [],
  action: any
): any => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return append(action.payload, notifications)

    case 'CLEAR_NOTIFICATIONS':
    case 'SET_FLOW':
      return []
  
    default:
      return notifications
  }
}

export default notificationsReducer;