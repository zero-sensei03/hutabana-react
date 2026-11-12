import axios from "axios";
import { useCsrfStore } from "@/stores/csrf-store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = useCsrfStore.getState().csrfToken;

  if (csrfToken) {
    config.headers.set("x-csrf-token", csrfToken);
  } else {
    config.headers.delete("x-csrf-token");
  }

  return config;
});

api.interceptors.response.use((response) => {
  const csrfToken = response.headers["x-csrf-token"];

  if (typeof csrfToken === "string" && csrfToken.length > 0) {
    useCsrfStore.getState().setCsrfToken(csrfToken);
  }

  return response;
});
