export interface AuthUser {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    token: string
}

export interface User extends AuthUser{
    phone: string,
    address: {
        address: string
    }
}