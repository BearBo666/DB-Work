// production环境
module.exports = {
    Mysql: {
        host: 'localhost',
        user: 'root',
        password: 'XiongBo2001.',
        database: 'teaching_affairs',
        port: 3306,
    },
    redisOptions: {
        host: '127.0.0.1',

        port: "6379",

        ttl: 1000 * 60 * 2,

        password: 'XiongBo2001.'
    }
}