export const createHeaders = (token, origin) => {
  token = token ? token : "";
  return { Authorization: token, "Access-Control-Allow-Origin": origin };
};
