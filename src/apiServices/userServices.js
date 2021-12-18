import { http } from './httpService';

export const profile = () => {
    return http.get("/profile")
}

export const getAllUsers = (page) => {
    if (page) {
        return http.get(`/super-admin/users/list/all?page=${page}`)
    }
    return http.get("/super-admin/users/list/all")
}

export const searchUser = (keyword) => {
    return http.get(`/super-admin/users/list/all?keyword=${keyword}`)
}

export const getAllUsersBasic = () => {
    return http.get("/super-admin/users/list/all?role_is_basic=true")
}
