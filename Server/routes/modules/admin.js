const { Admin, College, Major } = require('../../models')
const { hasSomeProperties } = require('../../utils/object')
const { encrypto, signToken } = require('../../utils/crypto')
const { addClass, deleteClass, updateClass, getClass } = require('../admin/class')
const { addCollege, deleteCollege, updateCollege, getCollege } = require('../admin/college')
const { addMajor, deleteMajor, updateMajor, getMajor } = require('../admin/major')
const { addStudent, updateStudent, getStudent } = require('../admin/student')
const { addTeacher, updateTeacher, getTeacher } = require('../admin/teacher')
const { addCourse, getCourse } = require('../admin/course')
const { addTeachingClass, getTeachingClass } = require('../admin/teachingClass')
const { addTower, getTower } = require('../admin/tower')
const { addRoom, getRoom } = require('../admin/room')

//登录
function Login(params) {
    return new Promise(async (resolve, reject) => {
        if (!hasSomeProperties(params, ['account', 'password'])) {
            reject({ code: 10001, msg: 'incomplete params' })
        } else {
            //查询此账号是否存在
            const { account, password, ipv4 } = params
            const admin = await Admin.findOne({
                raw: true,
                where: { account, password: encrypto(password) }
            }).catch(() => { reject({ code: 30001, msg: 'server error' }) })

            if (!admin) {
                reject({ code: 10002, msg: 'account or pwd error' })
            } else {
                const { level, name, institutionId } = admin

                //更新ip
                await Admin.update({ lastLogin: ipv4 }, { where: { account } }).catch(err => { })

                let token = signToken({ level, account, institutionId })

                resolve({
                    code: 10000,
                    data: { level, name, institutionId, token }
                })
            }
        }
    })
}

//注册管理员
function Register(params) {
    return new Promise((resolve, reject) => {
        const { account, password, level, auth, email, institutionId } = params
        if (!hasSomeProperties(params, ['account', 'password', 'level'])) {
            reject({ code: 10001, msg: 'incomplete params' })
        } else {

            //不可注册比自己等级高的管理员
            if (level < auth) {
                reject({ code: 10002, msg: 'has no auth' })
            } else {
                if (level == 2 && !checkCollege()) {
                    reject({ code: 10001, msg: 'params error' })
                } else if (level == 3 && !checkMajor()) {
                    reject({ code: 10001, msg: 'params error' })
                } else {
                    createAdmin()
                }
            }
        }

        //注册管理员
        function createAdmin() {
            Admin.create({ account, password: encrypto(password), level, email, institutionId }).catch(err => {
                reject({ code: 30001, msg: 'server error' })
            }).then(res => {
                resolve({ code: 10000, msg: 'success' })
            })
        }

        //检查是否存在该学院id
        async function checkCollege() {
            return await College.findOne({
                where: { collegeId: institutionId }
            })
        }

        //检查是否存在该专业id
        async function checkMajor() {
            return await Major.findOne({
                where: { majorId: institutionId }
            })
        }
    })
}

//增加
function Add(params) {
    return new Promise((resolve, reject) => {
        const { type } = params
        switch (type) {
            case 'college':
                addCollege(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'major':
                addMajor(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'class':
                addClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'teacher':
                addTeacher(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'student':
                addStudent(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'course':
                addCourse(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'teachingClass':
                addTeachingClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'tower':
                addTower(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'room':
                addRoom(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            default:
                reject({ code: 10001, msg: 'params error' })
        }
    })
}

//查找
function Get(params) {
    return new Promise((resolve, reject) => {
        switch (params.type) {
            case 'college':
                getCollege(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'major':
                getMajor(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'class':
                getClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'teacher':
                getTeacher(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'student':
                getStudent(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'course':
                getCourse(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'teachingClass':
                getTeachingClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'tower':
                getTower(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'room':
                getRoom(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            default:
                reject({ code: 10001, msg: 'params error' })
        }
    })
}

//更新
function Update(params) {
    return new Promise((resolve, reject) => {
        switch (params.type) {
            case 'college':
                updateCollege(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'major':
                updateMajor(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'class':
                updateClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'teacher':
                updateTeacher(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'student':
                updateStudent(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            default:
                reject({ code: 10001, msg: 'params error' })
        }
    })
}

//删除
function Delete(params) {
    return new Promise((resolve, reject) => {
        switch (params.type) {
            case 'college':
                deleteCollege(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'major':
                deleteMajor(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            case 'class':
                deleteClass(params).then(result => { resolve(result) }).catch(err => { reject(err) })
                break;
            default:
                reject({ code: 10001, msg: 'params error' })
        }
    })
}


module.exports = {
    Login, Register,
    Add, Delete, Update, Get
}