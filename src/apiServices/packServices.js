import { http } from './httpService';

export const createPack = (data) => {
    return http.post("/order/create", data)
}

export const getAllPacks = () => {
    return http.get("/order/get-all-order")
}

export const updatePack = (id) => {
    return http.put(`/order/fufil-order/${id}`)
}