import axios from "axios";

const fetchFromAPI = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyDYcvuiqb5tTdNctU8Mh2Xa9gme1kpppyY",
  },
});

export default fetchFromAPI;
