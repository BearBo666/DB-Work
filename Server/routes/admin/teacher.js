const { Teacher } = require('../../models')
const { hasSomeProperties } = require('../../utils/object')
const { encrypto } = require('../../utils/crypto')

//增加老师
function addTeacher(params) {
    return new Promise((resolve, reject) => {
        const { teacherNum, name, password, title, collegeId, email } = params
        if (!hasSomeProperties(params, ['teacherNum', 'collegeId', 'password', 'name'])) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Teacher.create({ teacherNum, name, password: encrypto(password), title, collegeId, email }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//修改信息
function updateTeacher(params) {
    return new Promise((resolve, reject) => {
        const { teacherNum, name, collegeId, title, email } = params
        if (!teacherNum) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Class.update(filterNull({ teacherNum, name, collegeId, title, email, password: encrypto(password) }), { where: { teacherNum } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取老师列表
function getTeacher(params) {
    return new Promise(async (resolve, reject) => {
        let { currentPage, pageNum, collegeId } = params

        if (!collegeId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { rows, count } = await Teacher.findAndCountAll({
                where: { collegeId },
                attributes: { exclude: ['password'] },
                offset: (currentPage - 1) * pageNum * 1,
                limit: pageNum
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })

            resolve({ code: 10000, data: rows, count })
        }
    })
}


module.exports = {
    addTeacher,
    updateTeacher,
    getTeacher
}