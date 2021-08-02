const { Major } = require('../../models')

//增加专业
function addMajor(params) {
    return new Promise((resolve, reject) => {
        const { majorName, collegeId } = params
        if (!majorName || !collegeId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Major.create({ majorName, collegeId }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//专业改名
function updateMajor(params) {
    return new Promise((resolve, reject) => {
        const { majorName, majorId } = params
        if (!majorName || !majorId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Major.update({ majorName }, { where: { majorId } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//删除专业
function deleteMajor(params) {
    return new Promise((resolve, reject) => {
        const { majorId } = params
        if (!majorId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Major.destroy({ where: { majorId } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取专业列表
function getMajor(params) {
    return new Promise(async (resolve, reject) => {
        let { currentPage, pageNum, collegeId } = params

        if (!collegeId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { rows, count } = await Major.findAndCountAll({
                where: { collegeId },
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
    addMajor,
    updateMajor,
    deleteMajor,
    getMajor
}