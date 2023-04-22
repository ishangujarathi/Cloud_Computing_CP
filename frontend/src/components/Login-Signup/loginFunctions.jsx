import axios from "axios";
const url = process.env.URL; url = url.replace(/\/undefined$/, "");

// export async function logUserIn(userCredentials) {
//   let apiUrl = `${url}/login`;
//   const res = await axios.post(apiUrl, userCredentials, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res;
// }

export function loadRoutes() {
  const authToken = localStorage.getItem("authToken" || "");
  let apiUrl = `${url}/api/user/profile?secret_token=${authToken}`;
  return axios.get(apiUrl);
}

export function getCurrentUserDetails(authToken) {
  const token = authToken;
  let apiUrl = `${url}/api/user/profile?secret_token=${token}`;
  return axios.get(apiUrl);
}
