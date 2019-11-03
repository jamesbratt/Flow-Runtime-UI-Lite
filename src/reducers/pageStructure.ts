import { assocPath } from 'ramda';

const pageStructureReducer = (
  page: any = {},
  action: any
): any => {
  switch (action.type) {
    case 'SET_SELECTED':
      const { pageComponentId, externalId } = action.payload;
      return {
        ...page,
        mapElementInvokeResponses: page.mapElementInvokeResponses.map((response: any) => {
          if (response.mapElementId === page.currentMapElementId) {
            return {
              ...response,
              pageResponse: assocPath(
                ['pageComponentDataResponses'],
                response.pageResponse.pageComponentDataResponses.map((component: any) => {
                  if (component.pageComponentId === pageComponentId) {
                    return {
                      ...component,
                      objectData: component.objectData.map((od: any) => {
                        if (od.externalId === externalId) {
                          return {
                            ...od,
                            isSelected: true,
                          }
                        }
                        return {
                          ...od,
                          isSelected: false,
                        }
                      })
                    } 
                  } 
                  return component
                }),
                response.pageResponse,
              )
            }
          }
          return response;
        })
      }

    case 'SET_CONTENT_VALUE':
      return action.payload
    case 'SET_FLOW':
      return action.payload
    default:
      return page
  }
}

export default pageStructureReducer;