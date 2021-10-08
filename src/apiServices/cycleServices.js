import { http } from './httpService';

export const createCycle = () => {
    return http.post("/cycle/create")
}

export const getCycle = () => {
    return http.get("/cycle/all/list")
}

export const editCycle = (id) => {
    return http.put(`/api/cycle/update/${id}`)
}

export const deleteCycle = (id) => {
    return http.delete(`/cycle/delete/${id}`)
}