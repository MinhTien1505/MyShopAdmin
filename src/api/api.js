import axios from "axios";

const baseDomain = "https://shopfreshapi.herokuapp.com";
//const baseDomain = "http://localhost:5000"
const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL,
});
