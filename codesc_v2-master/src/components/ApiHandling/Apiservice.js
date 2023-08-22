import axios from "axios";
import * as Constants from "../../utils/Constants.js";
const headers = {
  // Add your headers here
  // You can add other headers if required
};
// const apiUrl = APIRL;
var apiUrl = Constants.apiUrl;

export const fetchAnswer = async (query) => {
  try {
    const org = "DS";
    const project = "MM";
    const technology = "PYTHON";
    const modifiedUrl = `${apiUrl}?org=${org}&project=${project}&technology=${technology}&searchQuery=${query}`;
    console.log(modifiedUrl);
    const response = await axios.get(modifiedUrl, { headers });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching answer from API.");
  }
};
