import { http } from './httpService';

export const createFarm = (data) => {
    return http.post("/item/create", data)
}

export const editCategory  = (id, data) => {
    return http.put(`/article-category/${id}`, data)
}

export const deleteFarm = (id) => {
    return http.delete(`/item/delete/${id}`)
}