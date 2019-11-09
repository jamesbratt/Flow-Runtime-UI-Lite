/**
 * Describes the shape of data the UI gives TO the
 * engine, so that we can tell it what has changed.
 */

import { invokeType, objectData } from './common';

// Describes a single page component that has changed
export interface pageComponentInputResponses {
  pageComponentId: string,
  contentValue: string,
  objectData: [objectData],
}

// Describes a list of page components data thingys
export interface pageRequest {
  pageComponentInputResponses: [pageComponentInputResponses]
}

// Describes the page changes
export interface mapElementInvokeRequest {
  pageRequest: pageRequest,
  selectedOutcomeId: string | null,
}

// Describes the data structure we give to the engine
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