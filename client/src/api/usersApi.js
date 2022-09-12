import axios from "axios";
// import "../axios";

export const getAllUsers = async () => {
  let data = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/users`);
  return data;
};
