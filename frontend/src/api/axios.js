import axios from "axios";

const api=axios.create(
    {
        baseURL:`${import.meta.env.VITE_API_URL}`,
        withCredentials: true
    }
)
api.interceptors.response.use(
    response=>response,
    error=>
    {
        console.log(error)
        console.log(error.response.status)
        if(error.response?.status==401)
        {
            localStorage.removeItem('user')
            window.location.href='/'
        }
        console.log("else")
        return Promise.reject(error)
    }
)
export default api;