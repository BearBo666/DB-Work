//验证某一对象是否key都不为空
function hasSomeProperties(obj, keys) {
    return keys.every(key => {
        return obj[key]
    })
}

//过滤掉对象上为空的属性
function filterNull(obj) {
    let newObj = {}
    Object.keys(obj).forEach(key => {
        if (obj[key] !== null && obj[key] !== undefined) {
            newObj[key] = obj[key]
        }
    })

    return newObj
}

module.exports = {
    filterNull,
    hasSomeProperties
}