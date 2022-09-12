import { AxiosError } from 'axios';
import axios from '../api/Axios';
import { LOGOUT } from '../App.constants';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios(LOGOUT, {
                withCredentials: true
            });
            setAuth({ accessToken: undefined, user: undefined })
        } catch (e) {
            const err = e as AxiosError;
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;