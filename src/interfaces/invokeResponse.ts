/**
 * Describes the shape of data we get back from the engine
 * when making invoke requests. These are the instructions
 * given to the UI to tell it what to render
 */

import {
  contentType,
  containerType,
  invokeType,
  objectData,
  properties
} from './common';

// Hmmm...
enum pageActionBindingType {
  SAVE = 'SAVE'
}

// Something to do with...
export interface authorizationContext {
  authenticationType: string
  directoryId?: string
  directoryName?: string
  loginUrl?: string
}

// Yeah... something
export interface culture {
  brand?: string
  country: string
  developerName?: string
  developerSummary?: string
  id?: string
  language: string
  variant?: string
}

// Describes a single page component column
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
  typeElementPropertyId: string,
  size: number,
  width: number,
}

// Describes a single outcome to be displayed
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

// Yeah... dunno
export interface objectDataType {
  developerName: string
  typeElementId: string
  properties: properties
}

// Describes how a page component makes an objectdata request
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

// Describes a single page components data
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

// Describes a single page component
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

// Describes a single page containers data
export interface pageContainerDataResponses {
  isEditable: boolean
  isEnabled: boolean
  isVisible: boolean
  pageContainerId: string
  tags?: [any]
}

// Describes a single page container
export interface pageContainerResponses {
  attributes?: [any]
  containerType: containerType
  developerName: string
  id: string
  label: string
  order: number
  pageContainerResponses: [pageContainerResponses]
}

// Describes data specifically to do with what is
// displayed on the page
export interface pageResponse {
  attributes?: [any]
  label?: string
  order?: number
  pageComponentDataResponses: [pageComponentDataResponses]
  pageComponentResponses?: [pageComponentResponses]
  pageContainerDataResponses?: [pageContainerDataResponses]
  pageContainerResponses?: [pageContainerResponses]
  tags?: [any]
}

// Describes the UI data for a specific map element
export interface mapElementInvokeResponses {
  developerName?: string
  mapElementId?: string
  outcomeResponses?: [outcomeResponses]
  pageResponse: pageResponse
  rootFaults?: [any]
}

// The data structure received in the invoke response
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