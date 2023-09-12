import { useAuthContext } from "./useAuthContext";
import { useRoutinesContext } from "./useRoutinesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: routineDispatch } = useRoutinesContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logiut
    dispatch({ type: "LOGOUT" });
    routineDispatch({ type: "SET_ROUTINES", payload: null });
  };

  return { logout };
};
