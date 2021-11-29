import { http } from './httpService';

export const profile = () => {
    return http.get("/profile")
}

export const getAllUsers = () => {
    return http.get("/super-admin/users/list/all")
}