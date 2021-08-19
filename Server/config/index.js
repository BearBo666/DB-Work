const setting = require('./setting')
const db = require('./db')

module.exports = {
    ...db,
    ...setting
}