import { http } from './httpService';

export const createPack = (data) => {
    return http.post("/order/create", data)
}

export const getActivePacks = (id) => {
    return http.get(`/admin/active-packs/user/${id}`)
}

export const getPendingPacks = (id) => {
    return http.get(`/admin/pending-packs/user/${id}`)
}

export const acceptPack = (id) => {
    return http.put(`/admin/packs/accept/${id}`)
}

export const rejectPack = (id) => {
    return http.put(`/admin/packs/decline/${id}`)
}

export const getAllPacks = () => {
    return http.get("/order/get-all-order")
}

export const getAllActivePacks = () => {
    return http.get("/admin/packs/all-active")
}

export const getAllPendingPacks = () => {
    return http.get("/admin/packs/all-pending")
}

export const updatePack = (id) => {
    return http.put(`/order/fufil-order/${id}`)
}