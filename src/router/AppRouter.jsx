import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  //const authStatus = "not-authenticated";
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Loading...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ?
       ( <>
       
       <Route path="/auth/*" element={<LoginPage />} />
       <Route path="/*" element={<Navigate to="/auth/login" />} />
       </>
      ) : (
        <>
        <Route path="/*" element={<CalendarPage />} />
         <Route path="/*" element={<Navigate to="/" />} /> 
        </>
         )
      }

    </Routes>
  );
};
