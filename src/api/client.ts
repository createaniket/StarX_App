import axios from 'axios';
import Config from 'react-native-config';

export const api = axios.create({
baseURL: Config.API_BASE_URL,
timeout: 10000,
});

api.interceptors.response.use(
(res) => res,
(err) => {
const msg = err?.response?.data?.message || err.message;
return Promise.reject(new Error(msg));
}
);

