import { http } from './httpService';

export const createFarmType = (data) => {
    return http.post("/item-type/create", data)
}

export const getFarmType = () => {
    return http.get("/item-type/all/list")
}

export const editFarmType = (id, data) => {
    return http.put(`/item-type/update/${id}`, data)
}

export const deleteFarmType = (id) => {
    return http.delete(`/item-type/delete/${id}`)
}

export const switchFarmTypeStatus = (id) => {
    return http.put(`/item-type/switch-status/${id}`)
}

export const updateFarmTypeImage = (id) => {
    return http.put(`/item-type/upload-image/${id}`)
}

export const createFarmTypeWithDocument = (data) => {
    return http.post("/item-type-documents/create", data)
}

export const deleteFarmTypeWithDocument = (id) => {
    return http.delete(`/item-type-documents/delete/${id}`)
}