export interface Auth {
    id: number,
    token: string,
    isAuthenticated: boolean
}

export interface LoginCredentials {
    username: string,
    password: string
}