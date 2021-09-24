import request from '../utils/request'
import qs from 'qs'

// 分类列表
export function CateList() {
    return request({
        url: '/category/list',
        method: 'GET'
    })
}

// 添加分类
export function AddCate(data) {
    return request({
        url: '/category/add',
        method: 'POST',
        data: data
    })
}

// 更新分类
export function UpdateCate(data) {
    return request({
        url: '/category/update',
        method: 'POST',
        data: data
    })
}

// 删除分类
export function DeleteCate(data) {
    return request({
        url: '/category/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}