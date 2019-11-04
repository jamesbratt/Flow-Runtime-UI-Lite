import { assocPath } from 'ramda';

const pageStructureReducer = (
  page: any = {},
  action: any
): any => {
  switch (action.type) {
    case 'SET_CONTENT_VALUE': {
      const { pageComponentId, contentValue } = action.payload;
      return assocPath(
        ['mapElementInvokeResponses', 'pageResponse', 'pageComponentDataResponses'],
        page.mapElementInvokeResponses.pageResponse.pageComponentDataResponses.map((component: any) => {
          if (component.pageComponentId === pageComponentId) {
            return {
              ...component,
              contentValue,
            } 
          } 
          return component
        }),
        page,
      )
    }

    case 'SET_SELECTED': {
      const { pageComponentId, externalId, isSelected } = action.payload;
      return assocPath(
        ['mapElementInvokeResponses', 'pageResponse', 'pageComponentDataResponses'],
        page.mapElementInvokeResponses.pageResponse.pageComponentDataResponses.map((component: any) => {
          if (component.pageComponentId === pageComponentId) {
            return {
              ...component,
              objectData: component.objectData.map((od: any) => {
                if (od.externalId === externalId) {
                  return {
                    ...od,
                    isSelected: isSelected,
                  }
                }
                return  {
                  ...od,
                  isSelected: false,
                }
              })
            } 
          } 
          return component
        }),
        page,
      )
    }

    case 'SET_FLOW': {
      const mapElementInvokeResponse = action.payload.mapElementInvokeResponses.find(
        (response: any) => response.mapElementId === action.payload.currentMapElementId
      );
      return assocPath(['mapElementInvokeResponses'], mapElementInvokeResponse, action.payload);
    }
    default:
      return page
  }
}

export default pageStructureReducer;