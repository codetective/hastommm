import { http } from './httpService';

export const createCycle = (data) => {
    return http.post("/cycle/create", data)
}

export const getCycle = () => {
    return http.get("/cycle/all/list")
}

export const editCycle = (id, data) => {
    return http.put(`/cycle/update/${id}`, data)
}

export const deleteCycle = (id) => {
    return http.delete(`/cycle/delete/${id}`)
}