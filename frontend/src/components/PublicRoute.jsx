import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoopCircleLoading from "./loader";

/**
 * PublicRoute - Wrapper for routes like login/register
 * Redirects to /home if user is already authenticated
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="App">
                <LoopCircleLoading />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default PublicRoute;
