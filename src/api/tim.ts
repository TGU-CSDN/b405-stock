import http from "@/utils/request";
import { ResponseData } from "./types/models";

export const requestGetTimUserSig = () => {
  return http.request<ResponseData<string>>({
    url: `volunteer/im/userSig`,
    method: "GET",
    params: {},
    data: {},
  });
};
