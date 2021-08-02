const router = require('express').Router()
const { verifyToken } = require('../utils/crypto')
const { Login, Register, Add, Delete, Update, Get } = require('./modules/admin')

//拦截器
router.use(async (req, res, next) => {
    const { token } = req.headers
    if (req.path === '/login') {
        next()
    } else {
        verifyToken(token).then(decoded => {
            const { level, account, institutionId } = decoded
            if (req.method == 'GET') {
                req.query.auth = level
                req.query.account = account
                req.query.org = institutionId
            }
            if (req.method == 'POST') {
                req.body.auth = level
                req.body.account = account
                req.body.org = institutionId
            }
            next()
        }).catch(err => {
            res.send({ code: 20001, msg: 'unauthorized request' })
        })
    }
})

//注册管理员
router.post('/register', (req, res) => {
    Register(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//登录
router.post('/login', (req, res) => {
    Login(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//查找
router.get('/get/:type', (req, res) => {
    req.query.type = req.params.type
    Get(req.query).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//增加
router.post('/add/:type', (req, res) => {
    req.body.type = req.params.type
    Add(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//删除
router.post('/delete/:type', (req, res) => {
    req.body.type = req.params.type
    Delete(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

//更新
router.post('/update/:type', (req, res) => {
    req.body.type = req.params.type
    Update(req.body).then(result => { res.send(result) }).catch(err => { res.send(err) })
})

module.exports = router