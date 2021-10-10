import { http } from './httpService';

export const createArticle = (data) => {
    return http.post("/article/create", data)
}

export const createArticleImage = (data) => {
    return http.post("/article/image", data)
}

export const createArticleCategory = (data) => {
    return http.post("article-category/create", data)
}

export const getArticles = (page) => {
    if (page) {
        return http.get(`/article/${page}`)
    }
    return http.get("/article")
}

export const getArticle = (id) => {
    return http.get(`/article/${id}`)
}

export const getCategoryArticles = (id) => {
    return http.get(`/article-category/${id}`)
}

export const getAllPodcast = () => {
    return http.get("/article/podcasts/all")
}

export const editArticle = (id, data) => {
    return http.put(`/article/update/${id}`, data)
}

export const deleteArticle = (id) => {
    return http.delete(`/article/delete/${id}`)
}