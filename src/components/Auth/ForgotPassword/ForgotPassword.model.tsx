import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email address' })
});