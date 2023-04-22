import axios from "axios";

const url = process.env.URL;
url = url.replace(/\/undefined$/, "");

export default axios.create({
  baseURL: url,
});
