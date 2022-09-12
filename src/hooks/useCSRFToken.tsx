import React from 'react';
import axios from '../api/Axios';
import { CSRF } from '../App.constants';
import { MCAPResponse } from '../models/MCAP.model';
import useAuth from './useAuth';

const useCSRFToken = () => {
    const { auth, setAuth } = useAuth();

    const csrf = async () => {
        const response = await axios.get(CSRF, {
            withCredentials: true
        });
        const responseData = response?.data as MCAPResponse;
        if (responseData.token) {
            setAuth({ accessToken: auth.accessToken, user: auth.user, csrfToken: responseData.token });
            return responseData.token
        } else return '';
    }
    
    return csrf;
}

export default useCSRFToken;
