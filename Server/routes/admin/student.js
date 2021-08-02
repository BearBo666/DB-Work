const { Student } = require('../../models')
const { hasSomeProperties, filterNull } = require('../../utils/object')
const { encrypto } = require('../../utils/crypto')

//增加学生
function addStudent(params) {
    return new Promise((resolve, reject) => {
        if (!hasSomeProperties(params, ['studentNum', 'name', 'classId', 'password'])) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { studentNum, password, name, email, classId } = params

            Student.create({ studentNum, password: encrypto(password), name, email, classId }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }

    })
}


//更新学生信息
function updateStudent(params) {
    return new Promise((resolve, reject) => {
        const { studentNum, password, name, email, classId } = params
        if (!studentNum) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Student.update(filterNull({ password, name, email, classId }),
                { where: { studentNum } }
            ).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(() => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取学生列表
function getStudent(params) {
    return new Promise(async (resolve, reject) => {
        let { currentPage, pageNum, classId } = params

        if (!classId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { rows, count } = await Student.findAndCountAll({
                attributes: { exclude: ['password'] },
                where: { classId },
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
    addStudent,
    updateStudent,
    getStudent,
}