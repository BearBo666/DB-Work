import service from '../utils/request'

//登录
export function teacherLogin(data) {
    return service({
        url: '/teacher/login',
        method: 'post',
        data
    })
}

//更新自己信息
export function teacherUpdate(data) {
    return service({
        url: '',
        method: 'post',
        data
    })
}

//获得自己的教学班
export function teacherClass(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//获得自己教学班的学生
export function teacherStudent(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//获得自己的课表
export function teacherSchedule(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}

//给学生打分
export function teacherMark(params) {
    return service({
        url: '',
        method: 'get',
        params
    })
}