import axios from "axios";
import "../axios";

export const addUser = async (form) => {
  let data = await axios.post("/user/register", form);
  return data;
};

export const getAllUsers = async () => {
  let data = await axios.get("/user");
  return data;
};

export const updateUser = async (id, form) => {
  let data = await axios.patch(`/user/${id}`, form);
  return data;
};

export const getUserInfo = async (id) => {
  let data = await axios.get(`/user/${id}`);
  return data;
};
export const deleteUser = async (id) => {
  let data = await axios.delete(`/users/${id}`);
  return data;
};

export const sendContactMail = async (form) => {
  let data = await axios.post("user/send-mail", form);
  return data;
};

export const forgotPassword = async (form) => {
  let data = await axios.post("user/forgotpassword", form);
  return data;
};

export const resetPassword = async (token, form) => {
  let data = await axios.post(`user/resetpassword/${token}`, form);
  return data;
};
