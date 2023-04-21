import axios from "axios";

const url = process.env.URL;

export default axios.create({
  baseURL: url,
});
