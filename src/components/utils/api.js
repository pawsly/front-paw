import axios from "axios";

const baseURL = "http://3.39.25.7:8080";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60 * 3,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiClient = async (url: string, data: string) => {
  return await axiosInstance
    .post(url, data)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return undefined;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const setAuthorizationToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    console.log(axios.defaults.headers.common["Authorization"]);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
