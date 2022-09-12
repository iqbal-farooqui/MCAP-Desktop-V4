import { invoke } from "@tauri-apps/api";
import { AxiosError, AxiosInstance } from "axios";
import { CHANGE_OWN_PASSWORD } from "../../App.constants";
import { AuthUser } from "../../context/AuthProvider";
import { MCAPResponse } from "../../models/MCAP.model";

export const changePassword = async (axios: AxiosInstance, auth: AuthUser, setAuth: (authUser: AuthUser) => void, passwordCurrent: string, password: string, passwordConfirm: string) => {
    try {
        const response = await axios.patch(CHANGE_OWN_PASSWORD, {
            passwordCurrent,
            password,
            passwordConfirm
        })
        const responseData = response?.data as MCAPResponse;
        if (responseData.status === 'success') {
            if (responseData.token) setAuth({ ...auth, accessToken: responseData.token });
            return true;
        } else return false;
    } catch (e) {
        throw e as AxiosError;
    }
}

export const connectToQuickBooks = async (axios: AxiosInstance) => {
    try {
        await invoke('connect_to_quickbooks');
    } catch (e) {
        throw e as AxiosError;
    }
}