export enum invokeType {
  FORWARD = 'FORWARD',
  SYNC = 'SYNC',
}

export enum contentType {
  ContentString = 'ContentString',
  ContentNumber = 'ContentNumber',
}

export enum containerType {
  VERTICAL_FLOW = 'VERTICAL_FLOW',
}

export interface properties {
  contentFormat: string,
  contentType: contentType,
  contentValue?: string,
  developerName: string,
  objectData?: [objectData],
  typeElementId?: string,
  typeElementPropertyId?: string
}

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