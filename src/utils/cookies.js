import Cookies from "js-cookie";

export const getToken = () => Cookies.get("aksamedia-token");

export const setToken = (token) => {
  Cookies.set("aksamedia-token", token, { path: "/" });
};

export const removeToken = () => {
  Cookies.remove("aksamedia-token", { path: "/" });
};
