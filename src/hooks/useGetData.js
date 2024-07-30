/* eslint-disable no-undef */
import { useQuery } from "react-query";
import axiosInstance from '../axios/interceptors';

const useGetData = (endpoint) => {
  const getData = async () => {
    const { data } = await axiosInstance.get(`/${endpoint}`);
    return data;
  };

  return useQuery(endpoint, getData);
};

export default useGetData;
