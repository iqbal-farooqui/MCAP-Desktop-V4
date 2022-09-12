export interface User {
    email: string,
    name: string,
    passwordChangedAt?: Date,
    role: string,
    _id: string,
    active?: boolean,
    avatar?: string
}

export interface TauriUser {
    email: string,
    name: string,
    password_changed_at: string,
    role: string,
    id: string
}