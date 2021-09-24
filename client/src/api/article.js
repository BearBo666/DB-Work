import request from '../utils/request'

// 某一前人发布文章
export function AddArticle(data) {
    return request({
        url: '/article/add',
        method: 'POST',
        data
    })
}

// 获得某一前人的文章列表
export function GetArticleList(params) {
    return request({
        url: '/article/list',
        method: 'GET',
        params
    })
}

// 获得某一文章详情
export function GetArticleDetail(params) {
    return request({
        url: '/article/index',
        method: 'GET',
        params
    })
}