import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // login logic here
        setUser(userData);
    };

    const logout = () => {
        // logout logic here
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
