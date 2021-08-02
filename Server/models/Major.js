const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 专业
const Major = mySequelize.define('major', {
    //专业id
    majorId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //专业名
    majorName: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    //学院id
    collegeId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'major',
})

module.exports = Major