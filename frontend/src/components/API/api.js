import axios from "axios";

let url = 'https://bussp.azurewebsites.net';
url = url.replace(/\/undefined$/, "");



export default axios.create({
  baseURL: url,
});
