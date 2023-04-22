import axios from "axios";
let url = 'https://bussp.azurewebsites.net'; url = url.replace(/\/undefined$/, "");

export function registerUser(newUserDetails) {
  let apiUrl = `${url}/api/register`;
  return axios.post(apiUrl, newUserDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
