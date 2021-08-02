const Admin = require('./Admin')
const Class = require('./Class')
const College = require('./College')
const Course = require('./Course')
const Election = require('./Election')
const Major = require('./Major')
const TeachingClass = require('./TeachingClass')
const Room = require('./Room')
const Student = require('./Student')
const Teacher = require('./Teacher')
const Tower = require('./Tower')
const Train = require('./Train')


// 【！快速建表！】
// const { mySequelize } = require('../config')
// mySequelize.sync({
//     force: true,//是否清空数据库表
// }).then(function () {
//     console.log('ok');
// });

//一个学院有多个系
College.hasMany(Major, { foreignKey: 'collegeId' })
Major.belongsTo(College, { foreignKey: 'collegeId', targetKey: 'collegeId' })

//一个学院有多个老师
College.hasMany(Teacher, { foreignKey: 'collegeId' })
Teacher.belongsTo(College, { foreignKey: 'collegeId', targetKey: 'collegeId' })

//一个系有多个班级
Major.hasMany(Class, { foreignKey: 'majorId' })
Class.belongsTo(Major, { foreignKey: 'majorId', targetKey: 'majorId' })

//一个班主任带一个班级
Teacher.hasOne(Class, { foreignKey: 'teacherNum' })
Class.belongsTo(Teacher, { foreignKey: 'teacherNum', targetKey: 'teacherNum' })

//一个班级有多个学生
Class.hasMany(Student, { foreignKey: 'classId' })
Student.belongsTo(Class, { foreignKey: 'classId', targetKey: 'classId' })

//一栋教学楼有多个教室
Tower.hasMany(Room, { foreignKey: 'towerId' })
Room.belongsTo(Tower, { foreignKey: 'towerId', targetKey: 'towerId' })

//一个课程课开设多个课堂
Course.hasMany(TeachingClass, { foreignKey: 'courseId' })
TeachingClass.belongsTo(Course, { foreignKey: 'courseId', targetKey: 'courseId' })

//开设一个课堂可被多个学生选择
TeachingClass.hasMany(Election, { foreignKey: 'classesId' })
Student.hasMany(Election, { foreignKey: 'studentNum' })
Election.belongsTo(TeachingClass, { foreignKey: 'classesId', targetKey: 'classesId' })
Election.belongsTo(Student, { foreignKey: 'studentNum', targetKey: 'studentNum' })

//每个专业培养方案有多门课程
Major.hasMany(Train, { foreignKey: 'majorId', })
Course.hasMany(Train, { foreignKey: 'courseId' })
Train.belongsTo(Major, { foreignKey: 'majorId', targetKey: 'majorId' })
Train.belongsTo(Course, { foreignKey: 'courseId', targetKey: 'courseId' })

module.exports = {
    Admin,
    Class,
    College,
    Course,
    Election,
    Major,
    TeachingClass,
    Room,
    Student,
    Teacher,
    Tower,
    Train
}