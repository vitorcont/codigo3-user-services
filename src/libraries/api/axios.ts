import Axios, { AxiosInstance } from 'axios';
import * as https from 'https';

const axiosInstance = Axios.create({
  headers: {
    Accept: '*/*',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  timeout: 10000,
});

export const getAxiosInstance = (): AxiosInstance => {
  return axiosInstance;
};

export const getRoutesInstance = (): AxiosInstance => {
  axiosInstance.interceptors.request.use((request) => {
    request.baseURL = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic`;
    request.params = {
      alternatives: true,
      annotations: 'distance',
      geometries: 'geojson',
      language: 'pt',
      overview: 'full',
      steps: true,
      access_token: process.env.MAPBOXGL_TOKEN,
    };

    return request;
  });

  return axiosInstance;
};
