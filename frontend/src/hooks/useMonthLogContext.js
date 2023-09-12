import { MonthLogContext } from "../context/MonthLogContext";
import { useContext } from "react";

export const useMonthLogContext = () => {
  const context = useContext(MonthLogContext);

  if (!context) {
    throw Error("useMonthLogs must be used in ContextProvider");
  }

  return context;
};
