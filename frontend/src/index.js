//Imports
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Import Contexts
import { RoutinesContextProvider } from "./context/RoutineContext";
import { LogsContextProvider } from "./context/LogContext";
import { MonthLogContextProvider } from "./context/MonthLogContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UpdateContextProvider } from "./context/UpdateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoutinesContextProvider>
        <LogsContextProvider>
          <MonthLogContextProvider>
            <UpdateContextProvider>
              <App />
            </UpdateContextProvider>
          </MonthLogContextProvider>
        </LogsContextProvider>
      </RoutinesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
