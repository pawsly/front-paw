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
  try {
    const res = await axiosInstance.post(`${baseURL}` + url, data);
    if (res.status === 200) {
      return res.data;
    } else {
      // 실제 서버에서 에러 응답이 오는 경우
      return Promise.reject(new Error("Server returned an error."));
    }
  } catch (error) {
    // 요청 자체가 실패하는 경우 (네트워크 오류 등)
    console.log("Request failed:", error);
    return Promise.reject(error);
  }
};
