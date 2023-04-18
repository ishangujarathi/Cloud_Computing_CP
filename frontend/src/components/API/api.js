import axios from "axios";

let url;

process.env.NODE_ENV === "production"
  ? (url = process.env.URL)
  : (url = "http://localhost:8080");

export default axios.create({
  baseURL: url,
});
