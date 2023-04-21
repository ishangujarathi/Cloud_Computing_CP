import axios from "axios";
const url = process.env.URL

export function registerUser(newUserDetails) {
  let apiUrl = `${url}/api/register`;
  return axios.post(apiUrl, newUserDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
