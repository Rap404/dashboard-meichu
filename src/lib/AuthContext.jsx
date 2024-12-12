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
      setLoading(true);
      const response = await axios.post(url, { identifier, password });

      // Extract user and JWT token from response
      const { jwt, user: userData } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      successNotif("Login successful");

      return { user: userData, token: jwt };
    } catch (error) {
      // Handle login errors
      const errorMessage =
        error.response?.data?.error?.message || "Login failed";
      errorNotif(errorMessage);

      // Clear any existing auth data
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    successNotif("Logged out successfully");
  };

  // Function to check if user is authenticated
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  // Function to get authentication token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Context value
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
