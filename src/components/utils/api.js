import axios from "axios";

const baseURL = "http://3.35.37.177:8080";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: { "Contents-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("하하 ing..");
    return config;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log({ response });
    console.log("히히..");
    return response;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);

export const apiClient = async (url: string, data: string) => {
  return await axiosInstance
    .post(url, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return undefined;
      }
    })
    .catch((res) => {
      console.log(res);
    });
};
