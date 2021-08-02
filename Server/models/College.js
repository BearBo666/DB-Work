const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 学院
const College = mySequelize.define('college', {
    //学院id
    collegeId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //学院名
    collegeName: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'college',
})

module.exports = College