import axios from "axios";

// export default class Api {
//   constructor() {
const baseURL = "http://3.35.37.177:8080";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: { "contents-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = getToken();
    //
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['Authorization'] = `Bearer ${accessToken}`;
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
    return response;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);
// }
// }

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
