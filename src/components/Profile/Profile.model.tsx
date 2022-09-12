import { z } from 'zod';
import { ROLES } from '../../App.constants';

export const createNewEmpSchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    role: z.string(),
    password: z.string().min(8, { message: 'Password must be 8 characters or more' }),
    confirmPassword: z.string().min(8, { message: 'Password must be 8 characters or more' })
})