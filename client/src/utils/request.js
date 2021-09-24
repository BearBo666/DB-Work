import axios from 'axios'
import { getToken, getAuthToken } from './token'

import { message } from 'antd'

const service = axios.create({
    baseURL: 'http://127.0.0.1:7658',
    withCredentials: false,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
});


//请求拦截
service.interceptors.request.use(config => {
    // 用户token
    let token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    // 管理员token
    let authToken = getAuthToken()
    if (authToken) {
        config.headers['x-auth-token'] = authToken
    }
    return config
})

//响应拦截
service.interceptors.response.use(response => {
    const { data } = response
    if (data.code !== 10000) {
        message.error(data.msg || '请求异常')
        return Promise.reject(data.msg)
    }

    return data
})

export default service