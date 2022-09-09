import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { User } from "../models/UserInput";
import { UserInfo, LoginResponse } from "../models/LoginResponse";
import useStore from "./store";

const instance = axios.create({
  baseURL: "http://localhost:8000/v1",
  timeout: 15000,
});
const responseBody = (response: AxiosResponse) => response.data;

const userRequests = {
  get: (url: string, header?: AxiosRequestHeaders) =>
    instance.get<User>(url, { headers: header }).then(responseBody),
  post: (url: string, body?: User, header?: AxiosRequestHeaders) =>
    instance.post<User>(url, body, { headers: header }).then(responseBody),
  delete: (url: string) => instance.delete<User>(url).then(responseBody),
};

export const Users = {
  getAllUsers: (header?: AxiosRequestHeaders): Promise<UserInfo[]> =>
    userRequests.get("/user", header),
  loginUser: (User: User): Promise<LoginResponse> =>
    userRequests.post("/auth/login", User),
  refreshToken: (): Promise<string> => userRequests.post("/auth/refresh"),
  registUser: (User: User): Promise<UserInfo> =>
    userRequests.post("/auth/register", User),
  logOut: (header: AxiosRequestHeaders) =>
    userRequests.post("/auth/logout", {} as User, header),
};
