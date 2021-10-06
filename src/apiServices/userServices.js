import { http } from './httpService';

export const profile = () => {
    return http.get("/profile")
}