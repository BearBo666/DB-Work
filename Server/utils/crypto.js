const Crypto = require('crypto')
const JWT = require('jsonwebtoken')
const { key } = require('../config')

//加盐加密
function encrypto(str) {
    //加盐混淆
    str = str.slice(0, 2) + '@@@' + str.slice(2)
    return Crypto.createHash('md5').update(str).digest('hex');
}

//签发token
function signToken(signObj) {
    return JWT.sign(signObj, key, { expiresIn: 60 * 60 * 24 * 30 })
}

//验证token
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, key, (err, decoded) => {
            err ? reject(err) : resolve(decoded)
        })
    })
}

module.exports = {
    encrypto,
    signToken,
    verifyToken
}
