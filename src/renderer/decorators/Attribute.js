// Utils
import PropTypes from 'prop-types'
import inheritStaticProp from './inheritStaticProp'

export default function(propType) {
    // If we only have one argument then it's a propType.
    if (arguments.length === 1) {
        return AttributeDecorator.bind(null, propType)
    }

    // If no prop type is passed just mark it as "any"
    // and manually call the decorator function.
    return AttributeDecorator(PropTypes.any, ...arguments)
}

const RESERVED_KEYS = {
    key: true,
    ref: true
}

function AttributeDecorator(propType, proto, key, descriptor) {
    // Throw error if key is an invalid key.
    if (key in RESERVED_KEYS) {
        throw new Error(`@Attribute received a reserved key: "${key}"`)
    }

    // The class is actually prototype.constructor
    let classFn = proto.constructor

    // Attach defined attrs with React's propTypes
    inheritStaticProp(classFn, 'propTypes')
    classFn.propTypes[key] = propType || PropTypes.any

    // Attach defaultValue with React's defaultProps.
    if (descriptor.initializer) {
        inheritStaticProp(classFn, 'defaultProps')
        classFn.defaultProps[key] = descriptor.initializer()
    }

    return {
        configurable: true,
        enumerable: true,
        get() {
            return this.props[key]
        }
    }
}
