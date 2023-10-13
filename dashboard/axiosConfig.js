import axios from "axios";

const instance = axios.create({
  // baseURL: "https://creatorshubbackend-b16837fe8f12.herokuapp.com",
  baseURL: "http://localhost:7000",
});

export default instance;
