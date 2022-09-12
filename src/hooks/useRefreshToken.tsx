import React from 'react';
import axios from '../api/Axios';
import { REFRESH } from '../App.constants';
import { AuthUser } from '../context/AuthProvider';
import { MCAPResponse } from '../models/MCAP.model';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(REFRESH, {
            withCredentials: true
        });
        const responseData = response?.data as MCAPResponse;
        if (responseData.token) {
            setAuth({ accessToken: responseData.token, user: auth.user });
            return responseData.token
        } else return '';
    }
    
    return refresh;
}

export default useRefreshToken