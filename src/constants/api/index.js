export const BASE_URL = 'https://next.siennacharles.com';

export const API = {
  LOGIN: `${BASE_URL}/client/token`,
  LOGOUT: `${BASE_URL}/sanctum/logout`,
  GET_USER: `${BASE_URL}/api/user`,
  GET_TRIPS: `${BASE_URL}/api/v1/trips`,
  GET_TRIPS_BY_ID: `${BASE_URL}/api/v1/trips/1`,
  GET_MORE_PDFS: `${BASE_URL}/api/v1/trips`,
};

export const AXIOS_METHOD_TYPES = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};
