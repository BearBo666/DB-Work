import service from '../utils/request'

//管理员登录
export function adminLogin(data) {
    return service({
        url: '/admin/login',
        method: 'post',
        data
    })
}

//注册下级管理员
export function registerAdmin(data) {
    return service({
        url: '/admin/register',
        method: 'post',
        data
    })
}

//增加
export function Add(type, data) {
    return service({
        url: `/admin/add/${type}`,
        method: 'post',
        data
    })
}

//删除
export function Delete(type, data) {
    return service({
        url: `/admin/delete/${type}`,
        method: 'post',
        data
    })
}

//修改
export function Update(type, data) {
    return service({
        url: `/admin/update/${type}`,
        method: 'post',
        data
    })
}

//查询
export function Get(type, params) {
    return service({
        url: `/admin/get/${type}`,
        method: 'get',
        params
    })
}
