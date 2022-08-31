import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  cleanErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-day", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("incorrect credentials"));

      setTimeout(() => {
        dispatch(cleanErrorMessage());
      }, 10);
    }
  }
  const startRegister = async ({name, email, password, password2 }) => {

    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
        password2
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-day", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
     
    } catch (error) {
      dispatch(onLogout("incorrect credentials"));

      setTimeout(() => {
        dispatch(cleanErrorMessage());
      }, 10);
    }
  }


  return {
    //properties
    status,
    user,
    errorMessage,

    //methods
    startLogin,
    startRegister
  };
};
