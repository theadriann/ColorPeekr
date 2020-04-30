// utils
// const webpack = require('webpack')

// plugins
// const WriteFilePlugin = require('write-file-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env = {}) => {
    const commonConfig = {
        mode: process.env.NODE_ENV || 'development',

        module: {
            rules: [
                {
                    test: /\.node$/,
                    loader: 'node-loader',
                },

                {
                    test: /\.(m?js|node)$/,
                    parser: { amd: false },
                    use: {
                        loader: '@marshallofsound/webpack-asset-relocator-loader',
                        options: {
                            outputAssetBase: 'native_modules',
                        },
                    },
                },
            ],
        },
    }

    // if (env.clean) {
    //   const cleanPlugin = new CleanWebpackPlugin()
    //   commonConfig.plugins.push(cleanPlugin)
    // }

    // if (env.analyzeBundle) {
    //   commonConfig.plugins.push(new BundleAnalyzerPlugin())
    // }

    return commonConfig
}
