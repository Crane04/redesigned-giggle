import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const getRequest = async (path, options = {}) => {
  try {
    const response = await axios.get(`${BACKEND_URL}${path}`, options);
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${path}:`, error);
    return error;
  }
};

export default getRequest;
