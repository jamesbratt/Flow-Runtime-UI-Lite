/**
 * A client utility for making requests to the Flow runtime API
 * See the docs: https://manywho.github.io/docs-api/
 */

import axios from 'axios';
import { objectDataRequest } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';

const baseUrl = 'https://flow.manywho.com';

/**
 * 
 * @param id 
 * @param versionId 
 * @param manywhotenant
 * @description https://manywho.github.io/docs-api/#operation/InitializeFlow
 */
export const runRequest = (id: string, versionId: string, manywhotenant: string) => {
  return axios.post(
    `${baseUrl}/api/run/1`, {
      flowId: {
        id,
        versionId,
      },
    },
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}

/**
 * 
 * @param id 
 * @param versionId 
 * @param manywhotenant
 * @description https://manywho.github.io/docs-api/#operation/SimpleInitializeFlow
 */
export const initializationRequest = (id: string, versionId: string, manywhotenant: string) => {
  return axios.post(
    `${baseUrl}/api/run/1/state`, {
      id,
      versionId
    },
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}

/**
 * 
 * @param stateId 
 * @param manywhotenant
 * @description https://manywho.github.io/docs-api/#operation/JoinState
 */
export const joinRequest = (stateId: string, manywhotenant: string) => {
  return axios.get(
    `${baseUrl}/api/run/1/state/${stateId}`,
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}

/**
 * 
 * @param stateId 
 * @param manywhotenant 
 * @param requestPayload
 * @description https://manywho.github.io/docs-api/#operation/InvokeState
 */
export const invokeRequest = (stateId: string, manywhotenant: string, requestPayload: InvokeRequest) => {
  return axios.post(
    `${baseUrl}/api/run/1/state/${stateId}`,
    requestPayload,
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}

/**
 * 
 * @param manywhotenant 
 * @param objectDataRequest
 * @description https://manywho.github.io/docs-api/#tag/Service-Data
 */
export const serviceDataRequest = (manywhotenant: string, objectDataRequest: objectDataRequest) => {
  return axios.post(
    `${baseUrl}/api/service/1/data`,
    objectDataRequest,
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}



