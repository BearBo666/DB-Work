const express = require('express')
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express()

const { port } = require('./config')
const formate = require('./middleware/formate')

//中间件
app.use(formate)
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//引入路由
const AdminRouter = require('./routes/admin')
const StudentRouter = require('./routes/student')
const TeacherRouter = require('./routes/teacher')

app.use('/admin', AdminRouter)
app.use('/student', StudentRouter)
app.use('/teacher', TeacherRouter)

app.listen(port, () => {
    console.log('服务启动成功,运行环境' + process.env.NODE_ENV + '端口号' + port)
})