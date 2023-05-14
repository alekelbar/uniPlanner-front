import Cookies from "js-cookie";
import { UserState } from "../interfaces/users.interface";
export enum StorageKeys {
  token = "token",
  career = "careers",
  courses = "courses",
}

const ISSERVER = typeof window === "undefined";

export const setLocalToken = (session: UserState, key: string) => {
  // cookies
  const auth = JSON.stringify(session);
  Cookies.set(key, auth);
  // Local Storage
  if (!ISSERVER) {
    localStorage.setItem(key, auth);
  }
};

export const getLocalToken = (): UserState | null => {
  const token = Cookies.get("token");
  if (token) {
    return JSON.parse(token);
  }

  if (!ISSERVER && localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token")!);
  }

  return null;
};

export const logOut = () => {
  Cookies.remove("token");
  if (!ISSERVER) {
    window.localStorage.removeItem("token");
  }
};
