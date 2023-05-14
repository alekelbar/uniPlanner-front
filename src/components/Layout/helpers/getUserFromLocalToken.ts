import { getLocalToken } from "@/helpers/local-storage";
import { UserState, UserToken } from "@/interfaces/users.interface";

export const getUserFromToken = () => {
  const tokenCookie = getLocalToken();

  let token: UserState = {
    loading: false,
    token: "",
    user: {
      email: "",
      fullname: "",
      id: "",
      identification: "",
    },
  }; 

  if (tokenCookie) {
    token = tokenCookie;
  }
  
  return token;
};
