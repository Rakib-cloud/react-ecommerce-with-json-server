import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 👈 Added

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // 👈 Done loading
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };

    if (loading) return <div>Loading...</div>; // 👈 Optional loading UI

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
