import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const setToken = (token) => {
  // apply token for every request
  if (token)
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosClient.defaults.headers.common["Authorization"];
};

export default axiosClient;
