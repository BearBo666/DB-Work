const { College } = require('../../models')

//增加学院
function addCollege(params) {
    return new Promise((resolve, reject) => {
        const { collegeName, auth, org } = params
        if (auth !== 1) {
            reject({ code: 20000, msg: 'has no auth' })
        } else {
            if (!collegeName) {
                reject({ code: 10001, msg: 'params incomplete' })
            } else {
                College.create({ collegeName }).then(() => {
                    resolve({ code: 10000, msg: 'success' })
                }).catch(err => {
                    reject({ code: 30001, msg: 'server error' })
                })
            }
        }
    })
}

//学院改名
function updateCollege(params) {
    return new Promise((resolve, reject) => {
        const { collegeName, collegeId, auth, org } = params
        if (auth !== 1 && org !== collegeId) {
            reject({ code: 20000, msg: 'has no auth' })
        } else {
            if (!collegeName) {
                reject({ code: 10001, msg: 'params incomplete' })
            } else {
                College.update({ collegeName }, { where: { collegeId } }).then(() => {
                    resolve({ code: 10000, msg: 'success' })
                }).catch(err => {
                    reject({ code: 30001, msg: 'server error' })
                })
            }
        }
    })
}

//删除学院
function deleteCollege(params) {
    return new Promise((resolve, reject) => {
        const { collegeId } = params
        if (!collegeId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            College.destroy({ where: { collegeId } }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取学院列表
function getCollege(params) {
    return new Promise(async (resolve, reject) => {
        let { currentPage, pageNum } = params

        const { rows, count } = await College.findAndCountAll({
            offset: (currentPage - 1) * pageNum * 1,
            limit: pageNum
        }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })
        resolve({ code: 10000, data: rows, count })
    })
}

module.exports = {
    addCollege,
    updateCollege,
    deleteCollege,
    getCollege
}