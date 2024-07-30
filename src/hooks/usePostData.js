/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../axios/interceptors";

const usePostData = (endpoint) => {
  const queryClient = useQueryClient();

  const postData = async (body) => {
    const response = await axiosInstance.post(`/${endpoint}`, body);
    return response.data;
  };

  return useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries(endpoint);
    },
  });
};

export default usePostData;
