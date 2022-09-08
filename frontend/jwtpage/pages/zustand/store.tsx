import { userAgent } from "next/server";
import create from "zustand";

interface User {
  username: string;
  password: string;
}

type Store = {
  currentUser: Object;
  setCurrentUser: (user: Object) => void;
};

const useStore = create<Store>((set) => ({
  currentUser: { username: "", password: ""},
  setCurrentUser: (user:Object) => set(()=>({
    currentUser: user
  }))
}));

//export default useStore;
