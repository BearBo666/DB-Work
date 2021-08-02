const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 教室
const Room = mySequelize.define('room', {
    //教室id
    roomId: {
        type: DataTypes.INTEGER(6),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    //教室名
    // roomName: {
    //     type: DataTypes.STRING(128),
    //     allowNull: false
    // },
    //教学楼id
    towerId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'room',
})

module.exports = Room