const path = require('path');
// const redis = require('redis')
const Sequelize = require('sequelize')
const env = (process.env.NODE_ENV || 'development').toLowerCase()
const file = path.resolve(__dirname, env);


try {
    const { Mysql, redisOptions } = require(file);

    const mySequelize = new Sequelize(Mysql.database, Mysql.user, Mysql.password, {
        host: Mysql.host, //数据库服务器ip
        dialect: 'mysql', //数据库使用mysql
        port: 3306, //数据库服务器端口
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        timezone: "+08:00",
        logging: false // 控制台日志
    });

    // const redisClient = redis.createClient(redisOptions)

    // redisClient.on("error", function (error) {
    //     console.error('redis出错', error);
    // });

    module.exports = {
        mySequelize,
        //redisClient
    }
} catch (err) {
    console.log('无法载入配置文件')
    throw err;
}