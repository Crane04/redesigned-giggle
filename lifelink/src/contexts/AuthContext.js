import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setJwt(token);
    } catch (error) {
      console.error("Error saving JWT:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setJwt(null);
    } catch (error) {
      console.error("Error removing JWT:", error);
    }
  };

  const loadJwt = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setJwt(token);
      }
    } catch (error) {
      console.error("Error loading JWT:", error);
    }
  };

  useEffect(() => {
    loadJwt();
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
