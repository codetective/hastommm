import { http } from './httpService';

export const login = (data) => {
    return http.post("/super-admin/signin", data)
}

export const createAdmin = (data) => {
    return http.post("/super-admin/create-admin", data)
}

export const logout = () => {
    return http.post("/sign-out")
}