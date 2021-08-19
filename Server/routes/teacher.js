const router = require('express').Router()
const { Login, updateInfo, getSchedule, Mark, getTeachingClass, getStudent, manageClass } = require('./modules/teacher')
const { verifyToken } = require('../utils/crypto')

//全局拦截
router.use((req, res, next) => {
    const { token } = req.headers
    if (req.path === '/login') {
        next()
    } else {
        verifyToken(token).then(decoded => {
            const { teacherNum } = decoded
            if (req.method == 'GET') {
                req.query.teacherNum = teacherNum
            }
            if (req.method == 'POST') {
                req.body.teacherNum = teacherNum
            }
            next()
        }).catch(err => {
            res.send({ code: 20001, msg: 'unauthorized request' })
        })
    }
})

//登录
router.post('/login', (req, res) => {
    Login(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//获得自己的课表
router.get('/schedule', (req, res) => {
    getSchedule(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//改密码
router.post('/update', (req, res) => {
    updateInfo(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//老师打分
router.post('/mark', (req, res) => {
    Mark(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//获得教学班
router.get('/teachingClass', (req, res) => {
    getTeachingClass(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//获得教学班的学生
router.get('/student', (req, res) => {
    getStudent(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//班主任管理班级：查看学生成绩、课表、修改学生密码
// router.use('/manageClass', (req, res) => {
//     manageClass(req).then(result => { res.send(result) }).catch(err => { res.send(err) })
// })

module.exports = router