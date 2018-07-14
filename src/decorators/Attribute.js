// Utils
import PropTypes from 'prop-types'
import inheritStaticProp from './inheritStaticProp'

export default function(propType) {

    let attrPropType = propType

    let AttributeDecorator = function(proto, key, descriptor) {
        // The class is actually prototype.constructor
        let classFn = proto.constructor
    
        // Attach defined attrs with React's propTypes
        inheritStaticProp(classFn, 'propTypes')
        classFn.propTypes[key] = attrPropType
    
        // Attach defaultValue with React's defaultProps.
        if (descriptor.initializer) {
            inheritStaticProp(classFn, 'defaultProps')
            classFn.defaultProps[key] = descriptor.initializer()
        }
    
        return {
            configurable: true,
            enumerable:   true,
            get() {
                return this.props[key]
            }
        }
    }

    // If we only have one argument then it's a propType.
    if (arguments.length === 1) {
        return AttributeDecorator
    }

    // If no prop type is passed just mark it as "any"
    // and manually call the decorator function.
    attrPropType = PropTypes.any
    return AttributeDecorator(...arguments)
}