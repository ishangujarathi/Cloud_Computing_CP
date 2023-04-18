import axios from "axios";
let url;

process.env.NODE_ENV === "production"
  ? (url = process.env.URL)
  : (url = "http://localhost:8080");

export async function getRoutesFromApi(startCity, destination) {
  const baseURL = `${url}/booking/`;
  let incoming = await axios.post(baseURL, { startCity, destination });
  return incoming;
}
