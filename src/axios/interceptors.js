import axios from 'axios';


const API_URL = process.env.REACT_APP_API;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.ContentType = 'application/json';
    config.headers.Accept = 'application/json';
    console.log('Send request');
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);


axiosInstance.interceptors.response.use(
  function (response) {
    console.log('Got responce');
    return response;
  },
  function (error) {
    console.log('Eroarea:', error.response);
    return Promise.reject(error);
  },
);

export default axiosInstance;
