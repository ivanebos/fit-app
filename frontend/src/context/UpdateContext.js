import { createContext, useReducer } from "react";

export const UpdateContext = createContext();

export const updateReducer = (state, action) => {
  switch (action.type) {
    case "SET_UPDATE":
      return {
        updatingRoutine: action.payload,
      };

    default:
      return state;
  }
};

export const UpdateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(updateReducer, {
    updatingRoutine: null,
  });

  return (
    <UpdateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UpdateContext.Provider>
  );
};
