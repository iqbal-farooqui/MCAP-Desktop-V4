import axios from 'axios';
import { BASE_URL } from '../App.constants';

export default axios.create({
    baseURL: `${BASE_URL}/api`
})

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})