import {createContext, ReactElement, useEffect, useState} from "react";
import {User} from "../models/user";
import api, {setAccessToken, setRefreshToken} from "../api/axios";

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
}

const AuthenticatedContext = createContext<AuthContextType>(null!);

const AuthenticatedProvider = ({children}: {children: ReactElement}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const expiresInMinutes = 15;
        const body = { username, password, expiresInMinutes };
        const { data } = await api.post("/auth/login", body);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        const { data: userData } = await api.get("/auth/me");
        console.log("Fetched user data:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;        
    };

    const logout = async () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("user");
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

     useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (e) {
                console.error('Parse user error', e);
                localStorage.removeItem('user');
            }
        }
    }, []);

    return (
    <AuthenticatedContext.Provider value={{user, login, logout, updateUser}}>
        {children}
    </AuthenticatedContext.Provider>)
}

export { AuthenticatedProvider, AuthenticatedContext};