const { mySequelize } = require('../../config')
const { Op } = require('sequelize')
const { Student, TeachingClass, Election } = require('../../models')
const { updateStudent } = require('../admin/student')
const { getTeachingClass } = require('../admin/teachingClass')
const { hasSomeProperties } = require('../../utils/object')
const { encrypto, signToken } = require('../../utils/crypto')
const { getCurrentTerm } = require('../../utils/time')

//登录
function Login(params) {
    return new Promise(async (resolve, reject) => {
        //参数检查
        if (!hasSomeProperties(params, ['studentNum', 'password'])) {
            reject({ code: 10001, msg: 'incomplete error' })
        } else {
            //判断是否存在此学生
            const { studentNum, password } = params

            const stu = await Student.findOne({
                attributes: { exclude: ['password'] },
                where: { studentNum, password: encrypto(password) }
            }).catch(() => { reject({ code: 30001, msg: 'server error' }) })

            if (!stu) {
                reject({ code: 10002, msg: 'account or pwd error' })
            } else {
                //获得信息
                const stuClass = await stu.getClass() || 'error'
                const stuMajor = await stuClass.getMajor() || 'error'
                const stuCollege = await stuMajor.getCollege() || 'error'

                resolve({
                    code: 10000,
                    data: signToken({ studentNum }),
                    info: {
                        ...stu.dataValues,
                        class: stuClass.dataValues.className,
                        major: stuMajor.dataValues.majorName,
                        college: stuCollege.dataValues.collegeName
                    }
                })
            }
        }
    })
}

//更新信息：修改密码
function updateInfo(params) {
    return new Promise((resolve, reject) => {
        const { studentNum, password, email } = params
        if (!password && !email) {
            reject({ code: 10001, msg: 'incomplete error' })
        } else {
            updateStudent({ studentNum, password, email }).then(result => { resolve(result) }).catch(err => { reject(err) })
        }
    })
}

//获得课表
function getSchedule(params) {
    return new Promise(async (resolve, reject) => {
        let { studentNum, classTerm } = params

        let data = []
        //所有该学生所有的选课结果
        const elections = await Election.findAll({
            where: { studentNum }
        }).catch(err => {
            reject({ code: 30000, msg: 'server error' })
        }) || []
        //未传递学期则默认当前学期
        if (!classTerm) {
            classTerm = getCurrentTerm()
        }

        //获得指定学期的选课结果
        elections.forEach(async el => {
            const tc = await el.getTeachingClass().catch(err => {
                reject({ code: 30000, msg: 'server error' })
            })
            const { dataValues } = tc
            if (dataValues.classTerm == classTerm) {
                data.push(dataValues)
            }
        });

        resolve({ code: 10000, data, msg: 'success' })
    })
}

//获得成绩
function getGrade(params) {
    return new Promise(async (resolve, reject) => {
        const { studentNum, classTerm } = params

        //找到成绩不为空的选课记录
        const elections = await Election.findAll({
            where: { studentNum, grade: { [Op.ne]: null } }
        }).catch(err => {
            reject({ code: 30000, msg: 'server error' })
        })
        let data = []
        //遍历
        elections.forEach(async el => {
            let obj = { grade: el.grade }
            //找到对应的课程名
            const offer = await el.getOffer()
            const { dataValues } = offer
            if (classTerm) {
                if (dataValues.classTerm == classTerm) {
                    const course = offer.getCourse()
                    obj.courseName = course.dataValues.courseName
                    data.push(obj)
                }
            } else {
                const course = offer.getCourse()
                obj.courseName = course.dataValues.courseName
                data.push(obj)
            }
        })

        resolve({ code: 10000, data })

    })
}

//学生选课
function selectCourse(params) {
    return new Promise(async (resolve, reject) => {
        const { classesId, studentNum } = params
        if (!classesId) {
            reject({ code: 10001, msg: 'incomplete error' })
        } else {
            //找到该课堂
            let offer = await TeachingClass.findOne({ raw: true, where: { classesId } }).catch(err => {
                reject({ code: 30001, msg: 'not the teaching class' })
            })
            const { offerNumber, choosenNum } = offer
            //如果有余量
            if (offerNumber - choosenNum >= 1) {
                //开启托管事务
                try {
                    const result = await mySequelize.transaction(async t => {
                        //创建选课记录
                        await Election.create({ classesId, studentNum }, { transaction: t })


                        //余量-1
                        await TeachingClass.update({ choosenNum: choosenNum + 1 }, { where: { classesId }, transaction: t })


                        return { code: 10000, msg: 'success' }
                    })

                    resolve(result)
                } catch (error) {
                    //sequelize自动回滚
                    reject({ code: 30000, msg: 'server error' })
                }
            } else {
                reject({ code: 20001, msg: 'has no surplus!' })
            }
        }
    })
}

//获得培养方案
// function getTraining(params) {
//     return new Promise((resolve, reject) => {

//     })
// }

module.exports = {
    Login,
    getSchedule,
    getGrade,
    updateInfo,
    selectCourse,
    getTeachingClass
}