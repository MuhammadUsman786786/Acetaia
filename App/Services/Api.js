import axios from 'axios';
import {buildFormData} from '../Utils/Transform';

export const BASE_URL = 'http://localhost:8000';

export const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = '';
  delete axios.defaults.headers.common.Authorization;

  if (token) {
    axios.defaults.headers.common.Authorization = `token ${token}`;
  }
};

const formDataHeaderConfig = {
  headers: {'content-type': 'multipart/form-data'},
};

//user
export const login = data => axios.post(`${BASE_URL}/user/auth/login/`, data);
export const signUp = data =>
  axios.post(`${BASE_URL}/user/auth/register/`, data);

//batteries
export const getBatteries = () => axios.get(`${BASE_URL}/batterie/api/`);
export const deleteBattery = data =>
  axios.delete(`${BASE_URL}/batterie/api/${data.id}/`);
export const createBattery = data =>
  axios.post(`${BASE_URL}/batterie/api/`, data);

//barrel
export const getBarrel = data => axios.get(`${BASE_URL}/barili/api/${data.id}`);
export const getBarrels = () => axios.get(`${BASE_URL}/barili/api/`);
export const createBarrel = data => axios.post(`${BASE_URL}/barili/api/`, data);
export const editBarrel = (data, oldId) =>
  axios.put(`${BASE_URL}/barili/api/${oldId}/`, data);
export const deleteBarrel = data =>
  axios.delete(`${BASE_URL}/barili/api/${data.id}/`);

//operations
export const getOperations = () => axios.get(`${BASE_URL}/operazioni/api/`);
export const createOperation = data =>
  axios.post(
    `${BASE_URL}/operazioni/api/`,
    buildFormData(data),
    formDataHeaderConfig,
  );
export const deleteOperation = data =>
  axios.delete(`${BASE_URL}/operazioni/api/${data.id}/`);
