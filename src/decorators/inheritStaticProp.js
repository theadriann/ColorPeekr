module.exports = function(classFn, propName) {
    if (!classFn || classFn.hasOwnProperty(propName)) {
        return
    }
    classFn[propName] = Object.assign({}, classFn[propName])
}
