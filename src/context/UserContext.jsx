/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  //   when i reload the project
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
