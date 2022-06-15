import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.BACK_URL
})

export default axiosClient