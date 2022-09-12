import React, { useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import { AxiosError } from 'axios';
import useAxiosError from '../../hooks/useAxiosError';
import { MCAPError } from '../../models/Error.model';

type Props = {}

function PersistLogin({}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const axiosError = useAxiosError();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (e) {
                axiosError(e as AxiosError);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => { isMounted = false };

    }, [])
  
    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
  )
}

export default PersistLogin