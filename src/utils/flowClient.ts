import axios from 'axios';
import { objectDataRequest } from '../interfaces/invokeResponse';
import { InvokeRequest } from '../interfaces/invokeRequest';

const baseUrl = 'https://flow.manywho.com';

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

export const invokeRequest = (stateId: string, manywhotenant: string, requestPayload: InvokeRequest) => {
  return axios.post(
    `${baseUrl}/api/run/1/state/${stateId}`,
    requestPayload,
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}

export const serviceDataRequest = (manywhotenant: string, objectDataRequest: objectDataRequest) => {
  return axios.post(
    `${baseUrl}/api/service/1/data`,
    objectDataRequest,
    { headers: { manywhotenant } }
  ).catch(error => {
    throw Error(error.response.data)
  });
}



