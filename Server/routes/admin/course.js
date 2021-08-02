const { Course, Train } = require('../../models')
const { hasSomeProperties, filterNull } = require('../../utils/object')

//增加课程
function addCourse(params) {
    return new Promise((resolve, reject) => {
        if (!hasSomeProperties(params, ['courseName', 'credit'])) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { courseName, credit } = params

            Course.create({ courseName, credit }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }

    })
}


//更新课程信息
function updateCourse(params) {
    return new Promise((resolve, reject) => {
        const { courseName, credit, courseId } = params
        if ((!courseName && !credit) || !courseId) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            Course.update(filterNull({ courseName, credit }),
                { where: { courseId } }
            ).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(() => {
                reject({ code: 30001, msg: 'server error' })
            })
        }
    })
}

//获得课程列表
function getCourse(params) {
    return new Promise(async (resolve, reject) => {
        const { majorId, currentPage, pageNum } = params

        if (!majorId) {
            const { rows, count } = await Course.findAndCountAll({
                raw: true,
                limit: pageNum,
                offset: (currentPage - 1) * pageNum
            }).catch(() => {
                reject({ code: 30001, msg: 'server error' })
            })

            resolve({ code: 10000, data: rows, count })
        } else {
            const trains = await Train.findAll({
                where: { majorId }
            }).catch(() => {
                reject({ code: 30001, msg: 'server error' })
            })

            let data = []

            trains.forEach(async train => {
                let courses = await train.getCourse() || []

                data.push(...courses.dataValues)
            });

            resolve({ code: 10000, data, count: data.length })
        }
    })
}


module.exports = {
    addCourse,
    updateCourse,
    getCourse
}