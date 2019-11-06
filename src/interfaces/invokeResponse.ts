import { Guid } from 'guid-typescript';
import { contentType, containerType, invokeType, objectData } from './common';

enum pageActionBindingType {
  SAVE = 'SAVE'
}

export interface authorizationContext {
  authenticationType: string
  directoryId?: string
  directoryName?: string
  loginUrl?: string
}

export interface culture {
  brand?: string
  country: string
  developerName?: string
  developerSummary?: string
  id?: string
  language: string
  variant?: string
}

export interface outcomeResponses {
  attributes?: [any]
  developerName: string
  id: Guid
  isBulkAction: boolean,
  isOut: boolean
  label: string
  order: number
  pageActionBindingType: pageActionBindingType
  pageActionType: string
  pageObjectBindingId?: Guid
}

export interface pageComponentDataResponses {
  content?: string
  contentValue?: string
  fileDataRequest?: [any]
  imageUri?: string
  isEditable: boolean
  isEnabled: boolean
  isRequired: boolean
  isValid: boolean
  isVisible: boolean
  objectData?: [objectData]
  objectDataRequest?: any
  pageComponentId: Guid
  tags?: [any]
  validationMessage?: string
}

export interface pageComponentResponses {
  attributes?: [any]
  columns?: [any]
  componentType: string
  contentType: contentType
  developerName: string
  hasEvents: boolean
  height: number
  helpInfo: string
  hintValue: string
  id: Guid
  isMultiSelect: boolean
  isSearchable: boolean
  label: string
  maxSize: number
  order: number
  pageContainerDeveloperName: string,
  pageContainerId: Guid
  size: number
  width: number
}

export interface pageContainerDataResponses {
  isEditable: boolean
  isEnabled: boolean
  isVisible: boolean
  pageContainerId: Guid
  tags?: [any]
}

export interface pageContainerResponses {
  attributes?: [any]
  containerType: containerType
  developerName: string
  id: Guid
  label: string
  order: number
  pageContainerResponses: [pageContainerResponses]
}

export interface pageResponse {
  attributes?: [any]
  label?: string
  order?: number
  pageComponentDataResponses?: [pageComponentDataResponses] | null
  pageComponentResponses?: [pageComponentResponses]
  pageContainerDataResponses?: [pageContainerDataResponses]
  pageContainerResponses?: [pageContainerResponses]
  tags?: [any]
}

export interface mapElementInvokeResponses {
  developerName?: string
  mapElementId?: Guid
  outcomeResponses?: [outcomeResponses]
  pageResponse: pageResponse
  rootFaults?: [any]
}

export interface InvokeResponse {
  alertEmail?: string
  annotations?: string
  authorizationContext?: authorizationContext
  culture?: culture
  currentMapElementId?: Guid
  currentStreamId?: Guid
  invokeType?: invokeType
  joinFlowUri?: string
  mapElementInvokeResponses?: [mapElementInvokeResponses]
  selectedMapElementInvokeResponse: mapElementInvokeResponses
  navigationElementReferences?: [any]
  notAuthorizedMessage?: string
  outputs?: null
  parentStateId?: Guid
  preCommitStateValues?: any
  runFlowUri?: string
  stateId?: Guid
  stateLog?: any
  stateToken?: Guid
  stateValues?: any
  statusCode?: number
  voteResponse?: any
  waitMessage?: string
}