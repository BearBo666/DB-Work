const { Class } = require('../../models')
const { filterNull } = require('../../utils/object')

//增加班级
function addClass(params) {
    return new Promise((resolve, reject) => {
        const { className, majorId, teacherNum } = params
        if (!className || !majorId || !teacherNum) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Class.create({ className, majorId, teacherNum }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//班级信息修改
function updateClass(params) {
    return new Promise((resolve, reject) => {
        const { className, teacherNum, classId } = params
        if ((!className && !teacherNum) || !classId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Class.update(filterNull({ className, teacherNum }), { where: { classId } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//删除班级
function deleteClass(params) {
    return new Promise((resolve, reject) => {
        const { classId } = params
        if (!classId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Class.destroy({ where: { classId } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取班级列表
function getClass(params) {
    return new Promise(async (resolve, reject) => {
        let { currentPage, pageNum, majorId } = params

        if (!majorId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { rows, count } = await Class.findAndCountAll({
                where: { majorId },
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
    addClass,
    updateClass,
    deleteClass,
    getClass
}