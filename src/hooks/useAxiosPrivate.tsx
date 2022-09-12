import { axiosPrivate } from "../api/Axios";
import { useEffect } from 'react';
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { AxiosError, AxiosRequestConfig } from "axios";
import useCSRFToken from "./useCSRFToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const csrf = useCSRFToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {
                if (!config.headers) {
                    config.headers = {
                        'Authorization': `Bearer ${auth?.accessToken}`,
                        'xsrf-token': await csrf()
                    };
                }
                else {
                    if (!config.headers['Authorization']) {
                        config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                    }

                    if (!config.headers['xsrf-token']) {
                        config.headers['xsrf-token'] = await csrf();
                    }
                }
                return config;
            },
            (err) => Promise.reject(err)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err: any) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh, csrf])

    return axiosPrivate;
}

export default useAxiosPrivate;