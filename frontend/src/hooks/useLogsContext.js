import { LogContext } from "../context/LogContext";
import { useContext } from "react";

export const useLogsContext = () => {
  const context = useContext(LogContext);

  if (!context) {
    throw Error("useLogs must be used in ContextProvider");
  }

  return context;
};
