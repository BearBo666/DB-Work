import request from '../utils/request'

// 列表
export function PioneerList(params) {
    return request({
        url: '/pioneer/list',
        method: 'get',
        params
    })
}

// 某一领域的前人
export function PioneerByCate(params) {
    return request({
        url: '/pioneer/listByCate',
        method: 'get',
        params
    })
}

// 申请称为前人
export function AddPioneer(data) {
    return request({
        url: '/pioneer/apply',
        method: 'POST',
        data: data
    })
}

// 上传头像
export function UploadAvatar(data) {
    return request({
        url: '/upload/avatar',
        method: 'POST',
        data,
        headers: {
            ContentType: 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    })
}