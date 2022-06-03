import axios from 'axios'

const axiosClient = axios.create({
    baseURL:`${import.meta.env.VITE_BACK_URL}/api`
})

export default axiosClient