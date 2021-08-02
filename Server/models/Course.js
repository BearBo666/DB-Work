const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 课程
const Course = mySequelize.define('course', {
    //课程id
    courseId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //课程名
    courseName: {
        type: DataTypes.STRING(125),
        allowNull: false,
    },
    //学分
    credit: {
        type: DataTypes.FLOAT(2, 1),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'course',
})

module.exports = Course