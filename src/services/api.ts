import axios from "axios";
export function stringToBase64(val: string) {
  return Buffer.from(val).toString("base64");
}

export const AUTHORIZATION = `Basic ${stringToBase64("admin:password")}`;
export const api = axios.create({
  baseURL: "http://localhost:8080/",
});
api.interceptors.request.use(async (config: any) => {
  config.headers.Authorization = AUTHORIZATION;
  console.log(AUTHORIZATION);

  return config;
});
