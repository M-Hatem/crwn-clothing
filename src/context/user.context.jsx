import { useReducer, createContext, useEffect } from "react";

import { createAction } from "../helper/reducer.helper";

import { onAuthStateChangedListener, createUsers } from "../includes/firebase";

// The actual value that we want access to
const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Types for user reducer
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// To Initialized User Reducer
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error("Unhandled Type");
  }
};

// Inital value for the state
const INITIAL_VALUE = {
  currentUser: null,
};

const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_VALUE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  // In order to run an observable listener win the component is mounter
  useEffect(() => {
    const listener = onAuthStateChangedListener((user) => {
      if (user) {
        createUsers(user);
      }

      setCurrentUser(user);
    });

    return listener;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
