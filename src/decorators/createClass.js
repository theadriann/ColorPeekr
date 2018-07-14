
function defineProperties(target, props) {
    for (let i = 0, l = props.length; i < l; i++) {
        let descriptor = props[i]
        if (!descriptor.override && descriptor.key in target) {
            continue
        }

        descriptor.enumerable   = descriptor.enumerable || false
        descriptor.configurable = true

        if ('value' in descriptor) {
            descriptor.writable = true
        }

        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

module.exports = function(Constructor, protoProps, staticProps) {
    if (protoProps) {
        defineProperties(Constructor.prototype, protoProps)
    }

    if (staticProps) {
        defineProperties(Constructor, staticProps)
    }

    return Constructor
}
