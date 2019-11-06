import { InvokeResponse } from '../interfaces/invokeResponse';
import { Guid } from 'guid-typescript';

export const SET_FLOW = 'SET_FLOW'
export const SET_SELECTED_OBJECT_DATA = 'SET_SELECTED_OBJECT_DATA'
export const SET_CONTENT_VALUE = 'SET_CONTENT_VALUE'
export const SET_OUTCOME = 'SET_OUTCOME'

interface SetFlowAction {
  type: typeof SET_FLOW
  payload: InvokeResponse
}

interface SetOutcomeAction {
  type: typeof SET_OUTCOME
  payload: {
    outcomeId: Guid | null
  }
}

interface SetSelectedAction {
  type: typeof SET_SELECTED_OBJECT_DATA
  payload: {
    pageComponentId: Guid
    externalId: string
    isSelected: boolean
    outcomeId: Guid | null 
  }
}

interface SetContentValueAction {
  type: typeof SET_CONTENT_VALUE
  payload: {
    pageComponentId: Guid
    contentValue: string 
  }
}

export type pageStructureActionTypes = SetFlowAction | SetSelectedAction | SetContentValueAction | SetOutcomeAction