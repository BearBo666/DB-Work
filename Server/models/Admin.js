const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')
const { encrypto } = require('../utils/crypto')

// 管理员
const Admin = mySequelize.define('admin', {
    //账号
    account: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
    },
    //密码
    password: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    //姓名
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    //邮箱
    email: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    //上次登录ip
    lastLogin: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    //管理员等级 系统 学院 专业
    level: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
    },
    //所管理学院/专业的id
    institutionId: {
        type: DataTypes.INTEGER(6),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'admin',
})

module.exports = Admin