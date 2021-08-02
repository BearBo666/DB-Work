const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 学生选课
const Election = mySequelize.define('election', {
    electionId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //学生学号
    studentNum: {
        type: DataTypes.BIGINT(12),
        allowNull: false,
    },
    //开设课程id
    classesId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
    //成绩
    grade: {
        type: DataTypes.FLOAT(4, 1),
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'election',
})

module.exports = Election