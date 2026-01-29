import React, { createContext, useContext, useState, useEffect } from 'react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté (session localStorage)
        const authStatus = localStorage.getItem('agroptm_admin_auth');
        const storedUsername = localStorage.getItem('agroptm_admin_username');
        if (authStatus === 'true' && storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
    }, []);

    const login = async (password: string): Promise<boolean> => {
        try {
            const result = await GoogleSheetsAPI.verifyPassword(password);
            if (result.valid) {
                setIsAuthenticated(true);
                setUsername(result.username);
                localStorage.setItem('agroptm_admin_auth', 'true');
                localStorage.setItem('agroptm_admin_username', result.username);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        localStorage.removeItem('agroptm_admin_auth');
        localStorage.removeItem('agroptm_admin_username');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
