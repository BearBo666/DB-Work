import request from '../utils/request'

// 管理员登录
export function AdminLogin(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

// 管理员注册
export function AdminRegister(data) {
    return request({
        url: '/admin/register',
        method: 'POST',
        data: data
    })
}