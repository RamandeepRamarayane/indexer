import axios from "axios";
import { BACKEND_URL } from "./config/config";

const getToken = () => localStorage.getItem("token");

export const postData = async ({ payload, url, skipErrorMsg = false }) => {
  let res;
  try {
    res = await axios.post(`${BACKEND_URL}${url}`, payload, {
      headers: { Authorization: getToken() },
      skipErrorMsg: skipErrorMsg,
    });
  } catch (error) {
    return error.response || { data: {} };
  }
  return res;
};

export const putData = async ({ payload, url, skipErrorMsg = false }) => {
  let res;
  try {
    res = await axios.put(`${BACKEND_URL}${url}`, payload, {
      headers: { Authorization: getToken() },
      skipErrorMsg: skipErrorMsg,
    });
  } catch (error) {
    return error.response || { data: {} };
  }
  return res;
};

export const getData = async ({ url, params = {}, skipErrorMsg = false }) => {
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}${url}`, {
      headers: { Authorization: getToken() },
      skipErrorMsg: skipErrorMsg,
      params,
    });
  } catch (error) {
    return error.response || { data: {} };
  }
  return res;
};
