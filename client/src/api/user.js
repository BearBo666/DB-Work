import request from '../utils/request'

// 用户登录
export function UserLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 用户注册
export function UserRegister(data) {
    return request({
        url: '/user/register',
        method: 'POST',
        data
    })
}

// 用户列表
export function UserList(params) {
    return request({
        url: '/user/list',
        method: 'GET',
        params
    })
}