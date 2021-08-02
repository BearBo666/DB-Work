const setting = require('./setting')
const { mySequelize, redisClient } = require('./db')

module.exports = {
    mySequelize,
    redisClient,
    ...setting
}