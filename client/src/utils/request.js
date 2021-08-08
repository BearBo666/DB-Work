import axios from 'axios'
import { getToken } from './token'

const service = axios.create({
    baseURL: 'http://82.156.182.27:9270',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    withCredentials: false,
});

//请求拦截
service.interceptors.request.use(config => {
    let token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config
})

//响应拦截
service.interceptors.response.use(({ data }) => {
    if (data.code === 10000) {
        return data
    } else {
        return Promise.reject(new Error(data.msg || 'Error'));
    }
})

export default service