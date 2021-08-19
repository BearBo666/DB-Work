const router = require('express').Router()
const { Login, updateInfo, getSchedule, getGrade, selectCourse, getTeachingClass } = require('./modules/student')
const { verifyToken } = require('../utils/crypto')

//全局拦截
router.use((req, res, next) => {
    const { token } = req.headers
    if (req.path === '/login') {
        next()
    } else {
        verifyToken(token).then(decoded => {
            const { studentNum } = decoded
            if (req.method == 'GET') {
                req.query.studentNum = studentNum
            }
            if (req.method == 'POST') {
                req.body.studentNum = studentNum
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

//课表
router.get('/schedule', (req, res) => {
    getSchedule(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//成绩
router.get('/grade', (req, res) => {
    getGrade(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//学生选课
router.post('/select', (req, res) => {
    selectCourse(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//学生更新信息：密码，邮箱
router.post('/update', (req, res) => {
    updateInfo(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//获得教学班
router.get('/teachingClass', (req, res) => {
    getTeachingClass(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

module.exports = router