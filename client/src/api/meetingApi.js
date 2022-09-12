import axios from "axios";
// import "../axios";

export const getAllMeeting = async () => {
  let data = await axios.get(`${process.env.REACT_APP_API_URL}/api/meeting/`);
  return data;
};

export const getMeeting = async (id) => {
  let data = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/meeting/${id}`
  );
  return data;
};

export const createMeeting = async (form) => {
  let data = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/meeting/`,
    form
  );
  return data;
};

export const updateMeeting = async (id, form) => {
  let data = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/meeting/${id}`,
    form
  );
  return data;
};

export const deleteMeeting = async (id) => {
  let data = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/meeting/${id}`
  );
  return data;
};
