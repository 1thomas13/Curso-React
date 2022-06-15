import axiosClient from "./axios";

const tokenAuth = (token) => {
    if(token){
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return
    }

    delete axiosClient.defaults.headers.common['Authorization']
}

export default tokenAuth