import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-nodejs-projeto-deploy.onrender.com",
});
