/**
 * A bunch of common structures used when in 
 * engine API requests and responses.
 */

// Tells the engine what the flow is doing...
// Going to the next page or just refreshing the current page
export enum invokeType {
  FORWARD = 'FORWARD',
  SYNC = 'SYNC',
}

// Page components can have different content
// types. A way to determine whether a component
// is a primitive or complex structure
export enum contentType {
  ContentString = 'ContentString',
  ContentNumber = 'ContentNumber',
  ContentBoolean = 'ContentBoolean',
  ContentContent = 'ContentContent',
  ContentObject = 'ContentObject',
  ContentList = 'ContentList',
  ContentPassword = 'ContentPassword',
  ContentEncrypted = 'ContentEncrypted',
}

// A page container can have different types
// to determine how they should be positioned
export enum containerType {
  VERTICAL_FLOW = 'VERTICAL_FLOW',
  HORIZONTAL_FLOW = 'HORIZONTAL_FLOW',
}

// Represents a single property of an object
export interface properties {
  contentFormat: string,
  contentType: contentType,
  contentValue?: string,
  developerName: string,
  objectData?: [objectData],
  typeElementId?: string,
  typeElementPropertyId: string
}

// Represents a single piece of data a page component displays
export interface objectData {
  developerName: string,
  externalId: string,
  internalId: string,
  isSelected: boolean,
  order: number,
  properties: [properties],
  typeElementBindingDeveloperName?: string,
  typeElementId: string,
}