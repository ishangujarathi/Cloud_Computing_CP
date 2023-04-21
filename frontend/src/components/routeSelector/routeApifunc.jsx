import axios from "axios";
const url = process.env.URL

export async function getRoutesFromApi(startCity, destination) {
  const baseURL = `${url}/api/booking/`;
  let incoming = await axios.post(baseURL, { startCity, destination });
  return incoming;
}
