
const _    = require('lodash')
const path = require('path')

const webpack          = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig    = require('../webpack.config.js')

const baseDevServerConfig = {
    host: '127.0.0.1',
    port: 9000,

    compress: true,
    hot:      true,
    inline:   true,

    stats: {
        assets:          true,
        cached:          false,
        cachedAssets:    false,
        children:        false,
        chunks:          true,
        chunkModules:    false,
        chunkOrigins:    false,
        colors:          true,
        depth:           false,
        entrypoints:     false,
        errors:          true,
        errorDetails:    false,
        hash:            false,
        maxModules:      15,
        modules:         false,
        moduleTrace:     false,
        performance:     true,
        providedExports: false,
        publicPath:      false,
        reasons:         false,
        source:          false,
        timings:         true,
        usedExports:     false,
        version:         false,
        warnings:        true
    }
}

const devServerConfig = Object.assign({ }, baseDevServerConfig, webpackConfig.devServer)

// Inject hot module reload in every entry.
if (devServerConfig.hot) {
    const browserEntry = webpackConfig.entry.browser

    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig)

    webpackConfig.entry.browser = browserEntry
}

// Initialize webpack and webpack-dev-server
const compiler = webpack(_.merge(webpackConfig, { watch: true }))
const compilerFS = compiler.outputFileSystem
const devServer  = new WebpackDevServer(compiler, devServerConfig)

const devServerFS = devServer.middleware.fileSystem
for (const name in compilerFS) {
    if (typeof compilerFS[name] === 'function') {
        devServerFS[name] = compilerFS[name].bind(compilerFS)
    }
}

// Listen to the port and host
devServer.listen(devServerConfig.port, devServerConfig.host)
