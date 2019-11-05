import { Guid } from 'guid-typescript';

export enum invokeType {
  FORWARD = 'FORWARD',
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
  typeElementId?: Guid,
  typeElementPropertyId?: Guid
}

export interface objectData {
  developerName: string,
  externalId: string,
  internalId: Guid,
  isSelected: boolean,
  order: number,
  properties?: [properties],
  typeElementBindingDeveloperName?: Guid,
  typeElementId: Guid,
}