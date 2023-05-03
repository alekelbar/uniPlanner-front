import axios, { InternalAxiosRequestConfig } from "axios";
import { getLocalToken } from "../helpers/local-storage";

type AvailableVersions = "v1" | "v2";

export const API_VERSION: AvailableVersions = "v2";

// export const API_URL = "http://localhost:3000/api/v2/";
export const API_URL = "https://uniplannerback.onrender.com/api/v2/";

const addToken = (request: InternalAxiosRequestConfig) => {
  const token = getLocalToken()?.token
    ? `Bearer ${getLocalToken()?.token}`
    : null;
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
};

const API_INSTANCE = axios.create({
  baseURL: API_URL,
});

API_INSTANCE.interceptors.request.use((request) => addToken(request));

export { API_INSTANCE };
