import axios from "axios";
const url = process.env.URL; url = url.replace(/\/undefined$/, "");

export function registerUser(newUserDetails) {
  let apiUrl = `${url}/api/register`;
  return axios.post(apiUrl, newUserDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
