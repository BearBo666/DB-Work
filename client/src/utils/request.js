import axios from 'axios'
import { getToken } from './token'

import { message } from 'antd'

const service = axios.create({
    baseURL: 'http://127.0.0.1:7658',
    withCredentials: false,
});


//请求拦截
service.interceptors.request.use(config => {
    let token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    let authToken = getToken()
    if (authToken) {
        config.headers['x-auth-token'] = authToken
    }
    return config
})

//响应拦截
service.interceptors.response.use(response => {
    const { data } = response
    if (data.code !== 10000) {
        message.error(data.msg || 'error')
        return Promise.reject(data.msg)
    }

    return data
})

export default service