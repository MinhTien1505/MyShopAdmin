import axios from "axios";

const baseDomain = "https://shopfreshapi.herokuapp.com";
const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL,
});
