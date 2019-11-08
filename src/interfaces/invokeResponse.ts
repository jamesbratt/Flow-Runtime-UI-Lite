import {
  contentType,
  containerType,
  invokeType,
  objectData,
  properties
} from './common';

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

export interface column {
  componentType: string,
  contentType: contentType,
  developerName: string,
  hasEvents: boolean,
  height: number,
  helpInfo: string,
  hintValue: string,
  id: string,
  isMultiSelect: boolean,
  isSearchable: boolean,
  label: string,
  maxSize: number,
  order: number,
  pageContainerDeveloperName: string,
  pageContainerId: string,
  size: number,
  width: number,
}

export interface outcomeResponses {
  attributes?: [any]
  developerName: string
  id: string
  isBulkAction: boolean
  isOut: boolean
  label: string
  order: number
  pageActionBindingType: pageActionBindingType
  pageActionType: string
  pageObjectBindingId?: string
}

export interface objectDataType {
  developerName: string
  typeElementId: string
  properties: properties
}

export interface objectDataRequest {
  authorization: any
  command: any
  configurationValues: any
  listFilter: any
  objectData: objectData
  objectDataType: objectDataType
  stateId: string
  token: string | null
  typeElementBindingId: string
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
  objectData: [objectData]
  objectDataRequest: objectDataRequest | null
  pageComponentId: string
  tags?: [any]
  validationMessage?: string
}

export interface pageComponentResponses {
  attributes?: [any]
  columns: [column]
  componentType: string
  contentType: contentType
  developerName: string
  hasEvents: boolean
  height: number
  helpInfo: string
  hintValue: string
  id: string
  isMultiSelect: boolean
  isSearchable: boolean
  label: string
  maxSize: number
  order: number
  pageContainerDeveloperName: string,
  pageContainerId: string
  size: number
  width: number
}

export interface pageContainerDataResponses {
  isEditable: boolean
  isEnabled: boolean
  isVisible: boolean
  pageContainerId: string
  tags?: [any]
}

export interface pageContainerResponses {
  attributes?: [any]
  containerType: containerType
  developerName: string
  id: string
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
  mapElementId?: string
  outcomeResponses?: [outcomeResponses]
  pageResponse: pageResponse
  rootFaults?: [any]
}

export interface InvokeResponse {
  alertEmail?: string
  annotations: string
  authorizationContext?: authorizationContext
  culture?: culture
  currentMapElementId: string
  currentStreamId?: string
  invokeType: invokeType.FORWARD | invokeType.SYNC
  joinFlowUri?: string
  mapElementInvokeResponses?: [mapElementInvokeResponses]
  selectedMapElementInvokeResponse: mapElementInvokeResponses
  navigationElementReferences?: [any]
  notAuthorizedMessage?: string
  outputs?: null
  parentStateId?: string
  preCommitStateValues?: any
  runFlowUri?: string
  stateId: string
  stateLog?: any
  stateToken: string
  stateValues?: any
  statusCode?: number
  voteResponse?: any
  waitMessage?: string
}