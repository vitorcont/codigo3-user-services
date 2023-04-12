import Axios, { AxiosInstance } from 'axios';
import * as https from 'https';

const axiosInstance = Axios.create({
  baseURL: '',
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
