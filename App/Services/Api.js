import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
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
export const deleteBarrel = data =>
  axios.delete(`${BASE_URL}/barili/api/${data.id}/`);

//operations
export const createOperation = data =>
  axios.post(`${BASE_URL}/operazioni/api/`, data);
