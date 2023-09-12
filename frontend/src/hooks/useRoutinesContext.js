import { RoutineContext } from "../context/RoutineContext";
import { useContext } from "react";

export const useRoutinesContext = () => {
  const context = useContext(RoutineContext);

  if (!context) {
    throw Error("useRoutines must be used in ContextProvider");
  }

  return context;
};
