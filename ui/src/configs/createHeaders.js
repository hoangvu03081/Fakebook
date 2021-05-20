import { token } from "./constants";

export const createHeaders = (...headers) => {
  const uToken = localStorage.getItem(token);
  return { headers: { Authorization: uToken } };
};
