const fs = require('fs')
const path = require('path')

const rootDirectory = fs.realpathSync(process.cwd())

function resolvePath(relativePath) {
    return path.resolve(rootDirectory, relativePath)
}

module.exports = {
    src: resolvePath('src'),
    renderer: resolvePath('src/renderer'),
    third_party: resolvePath('third_party'),
}
