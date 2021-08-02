const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 班级
const Class = mySequelize.define('class', {
    //班级id
    classId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //班主任工号
    teacherNum: {
        type: DataTypes.BIGINT(12),
        allowNull: false,
    },
    //班级名
    className: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    //专业id
    majorId: {
        type: DataTypes.INTEGER(6),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'class',
})

module.exports = Class