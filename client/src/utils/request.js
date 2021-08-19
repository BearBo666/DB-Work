import axios from 'axios'
import { getToken } from './token'

import { message } from 'antd'

const service = axios.create({
    baseURL: 'http://82.156.182.27:9270',
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
    if (data.code !== 10000) {
        message.error(data.msg || 'error');
    }

    return data
})

export default service