import service from '../utils/request'

//学生登录
export function studentLogin(data) {
    return service({
        url: '/student/login',
        method: 'post',
        data
    })
}

//修改个人信息
export function Update(data) {
    return service({
        url: '',
        method: 'post',
        data
    })
}

//课表
export function Schedule(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//成绩
export function Grade(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//教学班
export function TeachingClass(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//选课
export function Select(data) {
    return service({
        url: '',
        method: 'post',
        data
    })
}