import axiosInstance from "../util/apiInstance";
const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";
import dynamic from 'next/dynamic'

const userLogin = async (email, password) => {
  // console.log(axiosInstance.baseURL)
  let res = await axiosInstance.post("api/login", {
    email: email,
    password: password,
  });
  console.log(res)
  localStorage.setItem(ACCESS_TOKEN, res.data.access);
  localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
};

const getEvents = async () => {
  let res = await axiosInstance.get("api/event/list", {});
  return res.data;
};

const userLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  
};

export { userLogin, getEvents, userLogout };
