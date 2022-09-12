import { ModalsContextProps } from "@mantine/modals/lib/context";
import { Text, Button } from "@mantine/core";
import { invoke } from "@tauri-apps/api";
import { AxiosError } from "axios";
import { MCAPError } from "../../../models/Error.model";
import { LoginResponse } from "./Login.model";

export const persistLoginResponse = async ({ data, token }: LoginResponse) => {
    const { user } = data;
    await invoke('persist_token', { token });
    await invoke('persist_user_name', { userName: user.name });
    await invoke('persist_user_role', { userRole: user.role });
}