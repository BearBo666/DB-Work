const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 教学楼
const Tower = mySequelize.define('tower', {
    //教学楼id
    towerId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //教学楼名
    towerName: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'tower',
})

module.exports = Tower