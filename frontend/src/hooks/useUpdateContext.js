import { UpdateContext } from "../context/UpdateContext";
import { useContext } from "react";

export const useUpdateContext = () => {
  const context = useContext(UpdateContext);

  if (!context) {
    throw Error("useUpdate must be used in ContextProvider");
  }

  return context;
};
