const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 教学班
const teachingClass = mySequelize.define('teaching_class', {
    //主键
    classesId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //课程id
    courseId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
    //老师工号
    teacherNum: {
        type: DataTypes.BIGINT(12),
        allowNull: false,
    },
    //教室id
    roomId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
    //开课学期
    classTerm: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    //课程时间
    classTime: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    //课程人数
    offerNumber: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    //已选人数
    choosenNum: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'teaching_class',
})

module.exports = teachingClass