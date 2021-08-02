const { TeachingClass, Course } = require('../../models')
const { hasSomeProperties } = require('../../utils/object')
const { Op } = require('sequelize')

//增加教学班
function addTeachingClass(params) {
    return new Promise((resolve, reject) => {
        if (!hasSomeProperties(params, ['courseId', 'teacherNum', 'roomId', 'classTerm', 'classTime', 'offerNumber'])) {
            reject({ code: 10001, msg: 'params incomplete' })
        } else {
            const { courseId, teacherNum, roomId, classTerm, classTime, offerNumber } = params

            TeachingClass.create({ courseId, teacherNum, roomId, classTerm, classTime, offerNumber }).then(() => {
                resolve({ code: 10000, msg: 'success' })
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
        }

    })
}

//获得教学班
function getTeachingClass(params) {
    return new Promise(async (resolve, reject) => {
        const { courseName, currentPage, pageNum } = params
        console.log(pageNum)
        //是否根据课程名获得教学班
        if (!courseName) {
            const { rows, count } = await TeachingClass.findAndCountAll({
                raw: true,
                offset: (currentPage - 1) * pageNum,
                limit: pageNum
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })
            resolve({ code: 10000, data: rows, count })

        } else {
            let courses = await Course.findAll({
                raw: true,
                where: {
                    courseName: {
                        [Op.substring]: courseName
                    }
                }
            }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            })

            let asyncFuc = []
            //模糊搜索到的课程
            for (let i = 0; i < courses.length; i++) {
                const { courseId } = courses[i];
                asyncFuc.push(TeachingClass.findAll({
                    raw: true,
                    where: { courseId }
                }))
            }
            Promise.all(asyncFuc).then(arr => {
                let data = arr.flat()
                resolve({ code: 10000, data, count: arr.length })
            })

        }
    })
}

module.exports = {
    addTeachingClass,
    getTeachingClass
}