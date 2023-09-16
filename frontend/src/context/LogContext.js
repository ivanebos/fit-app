import { createContext, useReducer } from "react";

export const LogContext = createContext();

export const logsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGS":
      return {
        logs: action.payload,
      };
    case "CREATE_LOG":
      return {
        logs: [action.payload, ...state.logs],
      };
    case "DELETE_LOG":
      return {
        logs: state.logs.filter((l) => l._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const LogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logsReducer, {
    logs: null,
  });

  return (
    <LogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LogContext.Provider>
  );
};
