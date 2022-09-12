import { createContext, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { User } from "../models/User.model";

interface AuthContextRS {
    persistToken: (token: string) => Promise<void>;
    persistUser: (userName: string, userRole: string) => Promise<void>;
    getToken: () => Promise<string>;
    getUser: () => Promise<{ name: string, role: string }>;
}

export interface AuthUser {
    user?: User;
    accessToken?: string;
    csrfToken?: string;
}

export interface AuthContextFE {
    auth: AuthUser;
    setAuth(authUser: AuthUser): void
}

const persistToken = async (token: string): Promise<void> => {
        await invoke('persist_token', { token });
    }

const persistUser = async (userName: string, userRole: string): Promise<void> => {
    await invoke('persist_user_name', { userName });
    await invoke('persist_user_role', { userRole });
}

const getToken = async (): Promise<string> => {
    return await invoke('get_token') as string;
}

const getUser = async (): Promise<{ name: string, role: string }> => {
    const name = await invoke('get_user_name') as string;
    const role = await invoke('get_user_role') as string;
    return { name, role }
}

const defaultValue: AuthContextFE = {
    auth: {
        user: {
            email: '',
            name: '',
            _id: '',
            role: ''
        },
        accessToken: '',
        csrfToken: ''
    },
    setAuth: function (authUser: AuthUser): void {
        throw new Error("Function not implemented.");
    }
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(defaultValue.auth);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;