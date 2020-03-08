import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getBatteries = () => axios.get(`${ BASE_URL }/batterie/api/`);
