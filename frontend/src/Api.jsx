import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const uploadResource = (data) =>
  API.post("/upload", data);

export const searchResources = (query) =>
  API.get(`/search?q=${query}`).then(res => res.data);

export const getResources = () =>
  API.get("/resources").then(res => res.data);
