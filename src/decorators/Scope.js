
module.exports = class Scope {

    fork() {
        var Fork = function() {}

        Fork.prototype = this

        return new Fork(this)
    }

    clean() {
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                delete this[prop]
            }
        }
    }
}
