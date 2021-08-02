// function test() {
//     return new Promise((resolve, reject) => {
//         let arr = [1, 2, 3, 4], data = []
//         arr.forEach(item => {
//             data.push(item)
//         })

//         resolve(data)
//     })
// }

// test().then(x => {
//     console.log(x)
// })


// Student.findOne({ attributes: { exclude: ['password'] }, where: { studentNum: 201913137151 } }).then(async stu => {
//     console.log(stu.name)
//     let cla = await stu.getClass()
//     let col = await cla.getMajor()
//     let cle = await col.getCollege()
//     console.log(cla.dataValues, col.dataValues, cle.dataValues)

//     console.log({ ...stu.dataValues })
// })

// Election.findAll({ where: { studentNum: 201913137151 } }).then(el => {

//     el.forEach(async element => {
//         let x = await element.getOffer()
//         console.log(x)
//     });
// })

// const { encrypto } = require('./utils/crypto')

// console.log(encrypto('123456'))

let data = []

let arr = [1, 2]

data.push(...arr)

console.log(data)