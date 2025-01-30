import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const postRequest = async (path, data, options = {}) => {
  try {
    const response = await axios.post(`${BACKEND_URL}${path}`, data, options);

    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error(
      `Error making POST request to ${path}:`,
      JSON.stringify(error)
    );
    return {
      data: error?.response?.data,
      status: error?.response?.status,
    };
  }
};

export const putRequest = async (path, data, options = {}) => {
  try {
    const response = await axios.put(`${BACKEND_URL}${path}`, data, options);
    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error(`Error making POST request to ${path}:`, error);
    return {
      data: error?.response?.data,
      status: error?.response?.status,
    };
  }
};

export default postRequest;
