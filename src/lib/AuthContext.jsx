import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { errorNotif, successNotif } from "../components/text/Notification";
import { baseUrl } from "../Constant";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        setToken(token);
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = async (identifier, password) => {
    const url = `${baseUrl}/auth/local`;
    try {
      const response = await axios.post(url, { identifier, password });

      // Extract user and JWT token from response
      console.log("odkdawda");
      const { jwt, user: userData } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      return { user: userData, token: jwt };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || "Login failed";

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      throw { ...error, message: errorMessage };
    } finally {
      // setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    checkAuth,
    getToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
