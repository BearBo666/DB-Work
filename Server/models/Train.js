const { mySequelize } = require('../config/index')
const { DataTypes } = require('sequelize')

// 培养方案
const Train = mySequelize.define('train', {
    //专业id
    majorId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
    //课程id
    courseId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
    },
    //类别
    type: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    //是否必修
    isRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'train',
})

module.exports = Train