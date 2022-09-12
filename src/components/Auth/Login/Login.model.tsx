import { z } from 'zod';
import { User } from '../../../models/User.model';

export const loginSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z.string()
});

export interface LoginResponse {
    status: string,
    token: string,
    data: UserData
}

interface UserData {
    user: User
}