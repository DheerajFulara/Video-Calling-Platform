import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication on app initialization
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem("access-token");

        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
                headers: { authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            localStorage.removeItem("access-token");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token) => {
        localStorage.setItem("access-token", token);

        // Decode JWT to get user data immediately without making API call
        try {
            // JWT is in format: header.payload.signature
            // We decode the payload (middle part)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const userData = JSON.parse(jsonPayload);

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Failed to decode token:", error);
            // Fallback to checkAuth if decode fails
            checkAuth();
        }
    };

    const logout = () => {
        localStorage.removeItem("access-token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
