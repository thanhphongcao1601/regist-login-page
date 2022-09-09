import create from "zustand";
import { LoginResponse, UserInfo } from "../models/LoginResponse";

type Store = {
  currentUser: UserInfo;
  accessToken: string;
  setAccessToken: (token:string) => void;
  setCurrentUser: (user: UserInfo) => void;
};

const useStore = create<Store>((set) => ({
  currentUser: {} as UserInfo,
  accessToken: "",
  setAccessToken: (token) =>
    set((state) => ({
      ...state,
      accessToken: token
    })),
  setCurrentUser: (user) =>
    set((state) => ({
      ...state,
      currentUser: user
    })),
}));

export default useStore;
