import { getLocalToken } from "@/helpers/local-storage";
import { UserToken } from "@/interfaces/users.interface";

export const getUserFromToken = () => {
  const token = getLocalToken();

  let user: UserToken = {
    email: "",
    fullname: "",
    id: "",
    identification: "",
  };

  if (token) {
    user = token.user;
  }
  return user;
};
