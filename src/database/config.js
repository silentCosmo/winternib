import { instance } from "../api/instance";

export const postDataToJson = (url,data) => instance.post(url,data)
