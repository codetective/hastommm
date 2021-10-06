import { createState } from '@hookstate/core';

const store = createState({
    isAuth: false,
    alertNotification: false,
    alertType: "",
    alertMessage: ""
})

export default store;