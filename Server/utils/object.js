function hasSomeProperties(obj, keys) {
    return keys.every(key => {
        return obj[key]
    })
}

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