const settingsReducer = (
  settings: Object = {
    flowId: null,
    flowVersionId: null,
    theme: 'material-ui',
    tenantId: window.location.pathname.split('/')[1],
  },
  action: any
): any => {
  return settings
}

export default settingsReducer;