import { Guid } from 'guid-typescript';
import { invokeType, objectData } from './common';

export interface pageComponentInputResponses {
  pageComponentId: Guid,
  contentValue?: string,
  objectData?: [objectData],
}

export interface pageRequest {
  pageComponentInputResponses: pageComponentInputResponses
}

export interface mapElementInvokeRequest {
  pageRequest: pageRequest,
  selectedOutcomeId: Guid,
}

export interface InvokeRequest {
  invokeType: invokeType,
  stateId: Guid,
  stateToken: Guid,
  currentMapElementId: Guid,
  annotations?: string,
  geoLocation?: string,
  mapElementInvokeRequest: mapElementInvokeRequest,
  mode: string,
  selectedMapElementId?: Guid,
  navigationElementId?: Guid,
  selectedNavigationElementId?: Guid,
}