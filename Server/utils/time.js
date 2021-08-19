//获得当前学期
function getCurrentTerm() {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1

    if (month < 9) {
        return `${year - 1}-${year}-2`
    } else {
        return `${year}-${year + 1}-1`
    }
}


module.exports = {
    getCurrentTerm
}

