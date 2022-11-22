import { useState, createContext, useEffect } from "react";

import { onAuthStateChangedListener, createUsers } from "../includes/firebase";

// The actual value that we want access to
const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
