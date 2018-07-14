import PropTypes from 'prop-types'
import Scope from './Scope'
import createClass from './createClass'
import inheritStaticProp from './inheritStaticProp'
import classnames from 'classnames'

module.exports = function(args = { }) {

    let applier = function(classFn) {

        // Merge args.proto in classFn.prototype
        Object.assign(classFn.prototype, args.proto)

        // Attach scope object on the classFn using React's contextTypes
        inheritStaticProp(classFn, 'contextTypes')
        classFn.contextTypes.scope = PropTypes.object

        // If scope is forked use React's childContextTypes
        if (args.fork) {
            // Mark the scope as forked
            classFn.prototype.$_forkScope = true

            // Get the original getChildContext method.
            let originalGetChildContext = null
            if (typeof classFn.prototype.getChildContext === 'function') {
                originalGetChildContext = classFn.prototype.getChildContext
            }

            // Create a new getChildContext which calls the original
            classFn.prototype.getChildContext = function getChildContext() {
                let childContext = { }
                if (originalGetChildContext !== null) {
                    childContext = originalGetChildContext.call(this)
                }
                childContext.scope = this.scope
                return childContext
            }

            inheritStaticProp(classFn, 'childContextTypes')
            classFn.childContextTypes.scope = PropTypes.object
        }

        // Attach defined events with React's propTypes
        if (Array.isArray(args.events)) {
            inheritStaticProp(classFn, 'propTypes')
            args.events.forEach(name => classFn.propTypes[name] = PropTypes.func)
        }

        // Attach name with React's displayName if args.name is string.
        if (typeof args.name === 'string') {
            classFn.displayName = args.name
        }

        if (!classFn.propTypes) {
            classFn.propTypes = { }
        }

        // Add className
        classFn.propTypes.className = PropTypes.any

        // Attach cool methods on the prototype.
        return createClass(classFn, ComponentProtoProps)
    }

    if (typeof args === 'function') {
        return applier(args)
    }

    return applier
}

let attachRefFunction = function(propertyName) {
    if (!this[`_attachRef_${propertyName}`]) {
        this[`_attachRef_${propertyName}`] = element => (this[propertyName] = element)
    }

    return this[`_attachRef_${propertyName}`]
}

let childAttributesFunction = function() {
    let attributes = { }
    let propTypes  = this.constructor.propTypes || { }

    for (let name in this.props) {
        if (name !== 'children' && !propTypes[name]) {
            attributes[name] = this.props[name]
        }
    }
    return attributes
}

let triggerFunction = function(name, ...args) {
    let propTypes = this.constructor.propTypes || { }

    if (!name || name === 'children' || !propTypes[name]) {
        console.warn(`Trying to trigger event with invalid name: ${name}`, this)
        return
    }

    let eventHandler = this.props[name]
    if (typeof eventHandler === 'function') {
        return eventHandler(...args)
    }
}

let childrenGetterFunction = function() {
    return this.props.children
}

let scopeGetterFunction = function() {
    if (this.$_scope) {
        return this.$_scope
    }

    if (this.context) {
        this.$_scope = this.context.scope
    }

    if (this.$_forkScope && this.$_scope) {
        this.$_scope = this.$_scope.fork()
    }
    else if (!this.$_scope) {
        this.$_scope = new Scope
    }

    return this.$_scope
}

let classNameGetterFunction = function() {
    return this.props.className || ''
}

let toClassnameFunction = function(...classes) {

    const attributes = this.undeclaredAttributes()

    if (attributes.className) {
        classes.push(attributes.className)
    }

    return classnames(this.className, ...classes)
}

let ComponentProtoProps = [
    {
        key:   'attachRef',
        value: attachRefFunction
    },
    {
        key:   'childAttributes',
        value: childAttributesFunction
    },
    {
        key:   'undeclaredAttributes',
        value: childAttributesFunction
    },
    {
        key:   'toClassname',
        value: toClassnameFunction
    },
    {
        key:   'trigger',
        value: triggerFunction
    },
    {
        key: 'children',
        get: childrenGetterFunction
    },
    {
        key:      'scope',
        get:      scopeGetterFunction,
        override: true
    },
    {
        key:          'className',
        get:          classNameGetterFunction,
        enumerable:   true,
        configurable: true
    }
]
