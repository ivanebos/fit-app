import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RoutinesContextProvider } from "./context/RoutineContext";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { LogsContextProvider } from "./context/LogContext";
import { MonthLogContextProvider } from "./context/MonthLogContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <RoutinesContextProvider>
          <LogsContextProvider>
            <MonthLogContextProvider>
              <App />
            </MonthLogContextProvider>
          </LogsContextProvider>
        </RoutinesContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
