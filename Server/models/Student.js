const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 学生
const Student = mySequelize.define('student', {
    //学号
    studentNum: {
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
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    //邮箱
    email: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    //班级id
    classId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'student',
})

module.exports = Student