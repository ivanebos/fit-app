import { createContext, useReducer } from "react";

export const MonthLogContext = createContext();

export const monthLogReducer = (state, action) => {
  switch (action.type) {
    case "GET_MONTHLOGS":
      return {
        monthLogs: action.payload,
      };

    default:
      return state;
  }
};

export const MonthLogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(monthLogReducer, {
    monthLogs: null,
  });

  return (
    <MonthLogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MonthLogContext.Provider>
  );
};
