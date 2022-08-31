import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { getEnvVariables } from "../helpers/getEnvVariables";

export const AppRouter = () => {
  const authStatus = "not-authenticated";
  console.log(getEnvVariables())

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      ) 
      : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/auth/*" element={<LoginPage />} />
    </Routes>
  );
};
