import { http } from './httpService';

export const createFarm = (data) => {
    return http.post("/item/create", data)
}

export const getFarm = () => {
    return http.get("/item/all/list")
}

export const editFarm = (id, data) => {
    return http.put(`/item/update/${id}`, data)
}

export const deleteFarm = (id) => {
    return http.delete(`/item/delete/${id}`)
}