export interface AuthUser {
    id: number,
    username: string,
    token?: string
}

export interface User extends AuthUser{
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: {
        address: string
    }
}