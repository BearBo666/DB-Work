const { Teacher, TeachingClass, Election } = require('../../models')
const { encrypto, signToken } = require('../../utils/crypto')
const { getCurrentTerm } = require('../../utils/time')
const { hasSomeProperties } = require('../../utils/object')

//登录
function Login(params) {
    return new Promise(async (resolve, reject) => {
        //参数检查
        if (!hasSomeProperties(params, ['teacherNum', 'password'])) {
            reject({ code: 10001, msg: 'incomplete error' })
        } else {
            //判断是否存在此学生
            const { teacherNum, password } = params

            const tea = await Teacher.findOne({
                attributes: { exclude: ['password'] },
                where: { teacherNum, password: encrypto(password) }
            }).catch(() => { reject({ code: 30001, msg: 'server error' }) })

            if (!tea) {
                reject({ code: 10002, msg: 'account or pwd error' })
            } else {
                resolve({ code: 10000, data: signToken({ teacherNum }), info: tea })
            }
        }
    })
}

//修改信息
function updateInfo(params) {
    return new Promise(async (resolve, reject) => {
        const { password, teacherNum, email } = params
        await Teacher.update({ password: encrypto(password), email }, { where: { teacherNum } }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })
        resolve({ code: 10000, msg: 'success' })
    })
}

//获得课表
function getSchedule(params) {
    return new Promise(async (resolve, reject) => {
        const { teacherNum } = params
        let data = await TeachingClass.findAll({
            raw: true,
            where: { teacherNum }
        }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })

        resolve({ code: 10000, data })
    })
}

//给学生打分
function Mark(params) {
    return new Promise(async (resolve, reject) => {
        if (!hasSomeProperties(params, ['studentNum', 'classesId', 'grade'])) {
            reject({ code: 10001, msg: 'incomplete error' })
        } else {
            const { teacherNum, studentNum, classesId, grade } = params
            //确定此学生是此老师课堂的学生
            let theClass = await TeachingClass.findOne({
                raw: true,
                where: { teacherNum, classesId }
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
            let theStudent = await Election.findOne({
                raw: true,
                where: { studentNum, classesId }
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })

            if (!theClass || !theStudent) {
                reject({ code: 10002, msg: '该老师不教授此课堂 或 该学生不属于此课堂' })
            } else {
                await Election.update({ grade }, { where: { studentNum } }).catch(err => {
                    reject({ code: 30001, msg: 'server error' })
                })

                resolve({ code: 10000, msg: 'success' })
            }
        }
    })
}

//获取自己的课堂
function getTeachingClass(params) {
    return new Promise(async (resolve, reject) => {
        const { teacherNum, classTerm } = params

        let data = await TeachingClass.findAll({
            raw: true,
            where: {
                teacherNum,
                classTerm: classTerm ? classTerm : getCurrentTerm()
            }
        }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })
        console.log(teacherNum, getCurrentTerm())
        resolve({ code: 10000, data })
    })
}

//获取自己某课堂的学生
function getStudent(params) {
    return new Promise(async (resolve, reject) => {
        const { teacherNum, classesId } = params

        let theClass = await TeachingClass.findOne({
            raw: true,
            where: { teacherNum, classesId }
        }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })

        if (!theClass) {
            reject({ code: 10002, msg: 'the teaching class is not exist' })
        } else {
            const data = await Election.findAll({
                raw: true,
                where: { classesId }
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })

            resolve({ code: 10000, data })
        }
    })
}

//班级管理(班主任)
function manageClass(params) {
    return new Promise((resolve, reject) => {

    })
}

module.exports = {
    Login,
    updateInfo,
    getSchedule,
    Mark,
    getTeachingClass,
    getStudent,
}