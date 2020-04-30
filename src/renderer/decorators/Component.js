import PropTypes from 'prop-types'
import createClass from './createClass'
import inheritStaticProp from './inheritStaticProp'

export default function(args = {}) {
    // If args is a function we used "@Component"
    if (typeof args === 'function') {
        return ComponentDecorator({}, args)
    }

    // If args is object we used it like "@Component({ ... })"
    return ComponentDecorator.bind(null, args)
}

function ComponentDecorator(args, classFn) {
    // Merge args.proto in classFn.prototype
    Object.assign(classFn.prototype, args.proto)

    // Attach defined events with React's propTypes
    if (Array.isArray(args.events)) {
        inheritStaticProp(classFn, 'propTypes')
        args.events.forEach(name => (classFn.propTypes[name] = PropTypes.func))
    }

    // Add className propType by default
    inheritStaticProp(classFn, 'propTypes')
    classFn.propTypes.className = PropTypes.any

    // Attach name with React's displayName if args.name is string.
    if (typeof args.name === 'string') {
        classFn.displayName = args.name
    }

    // Attach cool methods on the prototype.
    return createClass(classFn, ComponentProtoProps)
}

function childAttributesFunction() {
    const attributes = {}
    const propTypes = this.constructor.propTypes || {}

    for (const name in this.props) {
        if (name !== 'children' && !propTypes[name]) {
            attributes[name] = this.props[name]
        }
    }
    return attributes
}

function triggerFunction(name, ...args) {
    const propTypes = this.constructor.propTypes || {}

    if (!name || !propTypes[name]) {
        console.warn(`Trying to trigger event with invalid name: ${name}`, this)
        return
    }

    const eventHandler = this.props[name]
    if (typeof eventHandler === 'function') {
        return eventHandler(...args)
    }
}

function getChildrenFunction() {
    return this.props.children
}

function getClassNameFunction() {
    return this.props.className || ''
}

const ComponentProtoProps = [
    {
        key: 'childAttributes',
        value: childAttributesFunction
    },
    {
        key: 'undeclaredAttributes',
        value: childAttributesFunction
    },
    {
        key: 'trigger',
        value: triggerFunction
    },
    {
        key: 'children',
        get: getChildrenFunction
    },
    {
        key: 'className',
        get: getClassNameFunction,

        enumerable: true,
        configurable: true
    }
]
