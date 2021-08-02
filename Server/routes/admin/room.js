const { Room } = require('../../models')

//录入教学楼
function addRoom(params) {
    return new Promise((resolve, reject) => {
        const { towerId } = params
        if (!towerId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Room.create({ towerId }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                console.log(err)
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获取教室列表
function getRoom(params) {
    return new Promise(async (resolve, reject) => {
        const { towerId, currentPage, pageNum } = params

        if (!towerId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            let { rows, count } = await Room.findAndCountAll({
                raw: true,
                offset: (currentPage - 1) * pageNum,
                limit: pageNum
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })

            resolve({ code: 10000, data: rows, count })
        }
    })
}

module.exports = {
    addRoom,
    getRoom
}