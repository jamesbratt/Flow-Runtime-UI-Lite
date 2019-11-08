import { invokeType, objectData } from './common';

export interface pageComponentInputResponses {
  pageComponentId: string,
  contentValue: string,
  objectData: [objectData],
}

export interface pageRequest {
  pageComponentInputResponses: [pageComponentInputResponses]
}

export interface mapElementInvokeRequest {
  pageRequest: pageRequest,
  selectedOutcomeId: string | null,
}

export interface InvokeRequest {
  invokeType: invokeType.FORWARD | invokeType.SYNC,
  stateId: string,
  stateToken: string,
  currentMapElementId: string | null,
  annotations: string | null,
  geoLocation: string | null,
  mapElementInvokeRequest: mapElementInvokeRequest,
  mode: string | null,
  selectedMapElementId: string | null,
  navigationElementId: string | null,
  selectedNavigationElementId: string | null,
}