const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')
const { encrypto } = require('../utils/crypto')

// 老师
const Teacher = mySequelize.define('teacher', {
    //工号
    teacherNum: {
        type: DataTypes.BIGINT(12),
        allowNull: false,
        primaryKey: true
    },
    //密码
    password: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    //姓名
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    //职称
    title: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    //邮箱
    email: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
    //学院id
    collegeId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'teacher',
})

module.exports = Teacher