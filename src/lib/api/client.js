import axios from "axios";

const client = axios.create();
const client2 = axios.create();

//client.defaults.baseURL = "http://localhost:8080/";

client.defaults.headers.post["Content-Type"] =
  "application/json; charset=UTF-8";

client.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");

//

client.interceptors.request.use(
  (request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));

    //console.log("request", request);

    return request;
  },
  (error) => {
    console.log("error", error);

    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    console.log("Starting Response", JSON.stringify(response, null, 2));

    return response;
  },
  (error) => {
    console.log("error", error);

    return Promise.reject(error);
  }
);

export default client;
