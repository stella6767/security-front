import client from "./client";

export const test = (parame) => {
  console.log("순서 4 parame", parame);

  return client.get(`/test?parame=${parame}`);
};
export const test2 = (data) => client.post("/test2", JSON.stringify(data));
export const test3 = (data) => client.get("/test3");
