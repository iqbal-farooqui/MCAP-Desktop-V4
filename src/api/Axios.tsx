import axios from 'axios';
import { BASE_URL } from '../App.constants';

export default axios.create({
    baseURL: `${BASE_URL.DEV}/api`
})

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL.DEV}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})