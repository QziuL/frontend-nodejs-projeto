import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-nodeapi.onrender.com",
  //baseURL: "http://localhost:3000",
});
