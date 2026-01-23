import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

axiosInstance.interceptors.request.use(
  async request => {
    request.headers.Authorization = `TMiniApp ${localStorage.getItem("initData")}`;

    return request;
  });

export default axiosInstance;