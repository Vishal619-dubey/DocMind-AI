import axios from "axios";

const API = axios.create({
  baseURL: "https://docmind-ai-gmxl.onrender.com/api",
});

export default API;