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
  const startRegister = async ({ name, email, password }) => {

    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,

      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-day", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || 'register falided'));

      setTimeout(() => {
        dispatch(cleanErrorMessage());
      }, 10);
    }
  }
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = calendarApi.get('/auth/renew')
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-day", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }

  }

const startLogout = ()=> {
  localStorage.clear()
  dispatch(onLogout())

}

  return {
    //properties
    status,
    user,
    errorMessage,

    //methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
