import axios from "axios";
let url = 'https://bussp.azurewebsites.net'; url = url.replace(/\/undefined$/, "");

export async function getRoutesFromApi(startCity, destination) {
  const baseURL = `${url}/api/booking/`;
  let incoming = await axios.post(baseURL, { startCity, destination });
  return incoming;
}
