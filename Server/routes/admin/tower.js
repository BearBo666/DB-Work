const { Tower } = require('../../models')

//录入教学楼
function addTower(params) {
    return new Promise((resolve, reject) => {
        const { towerName, towerId } = params
        if (!towerName) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {

            Tower.create({ towerName, towerId }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                console.log(err)
                reject({ code: 30001, msg: 'server error' })
            })
        }

    })
}

//教学楼列表
function getTower(params) {
    return new Promise(async (resolve, reject) => {
        const { currentPage, pageNum } = params

        let { rows, count } = await Tower.findAndCountAll({
            raw: true,
            offset: (currentPage - 1) * pageNum,
            limit: pageNum
        }).catch(err => {
            reject({ code: 30001, msg: 'server error' })
        })

        resolve({ code: 10000, data: rows, count })
    })
}


module.exports = {
    addTower,
    getTower
}