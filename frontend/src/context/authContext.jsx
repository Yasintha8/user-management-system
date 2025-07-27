/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    //get the user and token from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    //if there is a user and token in localStorage, set the user in state
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); 
  }, []);


  //saves the user and token to localStorage + sets the user in state.
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };


  //removes the user and token from localStorage + sets the user in state to null
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
