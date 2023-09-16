import { createContext, useReducer } from "react";

export const RoutineContext = createContext();

export const rountinesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROUTINES":
      console.log("BAD");
      return {
        routines: action.payload,
      };
    case "CREATE_ROUTINE":
      console.log("BAD");

      return {
        routines: [action.payload, ...state.routines],
      };
    case "UPDATE_ROUTINE":
      return {
        routines: state.routines.map((routine) => {
          if (routine._id == action.payload._id) {
            return action.payload;
          }
          return routine;
        }),
      };
    case "DELETE_ROUTINE":
      return {
        routines: state.routines.filter((r) => r._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RoutinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rountinesReducer, {
    routines: null,
  });

  return (
    <RoutineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoutineContext.Provider>
  );
};
