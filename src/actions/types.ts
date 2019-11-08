import { InvokeResponse } from '../interfaces/invokeResponse';

export const SET_FLOW = 'SET_FLOW'
export const SET_SELECTED_OBJECT_DATA = 'SET_SELECTED_OBJECT_DATA'
export const SET_CONTENT_VALUE = 'SET_CONTENT_VALUE'
export const SET_OUTCOME = 'SET_OUTCOME'
export const SET_SERVICE_DATA = 'SET_SERVICE_DATA'
export const SET_COMPONENT_DATA = 'SET_COMPONENT_DATA'

interface SetFlowAction {
  type: typeof SET_FLOW
  payload: InvokeResponse
}

interface SetOutcomeAction {
  type: typeof SET_OUTCOME
  payload: {
    outcomeId: string | null
  }
}

interface SetSelectedAction {
  type: typeof SET_SELECTED_OBJECT_DATA
  payload: {
    pageComponentId: string
    externalId: string
    isSelected: boolean
    outcomeId: string | null 
  }
}

interface SetContentValueAction {
  type: typeof SET_CONTENT_VALUE
  payload: {
    pageComponentId: string
    contentValue: string 
  }
}

interface SetServiceDataAction {
  type: typeof SET_SERVICE_DATA
  payload: {
    objectDataResponse: any,
    pageComponentId: string,
  }
}

interface SetComponentDataAction {
  type: typeof SET_COMPONENT_DATA
  payload: {
    syncedData: any,
  }
}

export type pageStructureActionTypes = SetComponentDataAction | SetServiceDataAction | SetFlowAction | SetSelectedAction | SetContentValueAction | SetOutcomeAction