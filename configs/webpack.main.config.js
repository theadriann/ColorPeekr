// utils
const merge = require('webpack-merge')

// configs
const commonConfigFn = require('./webpack.common.config')

const configFn = (env = {}) => {
    const config = {
        entry: './src/main/index.js',

        module: {
            rules: [
                // {
                //     test: /\.node$/,
                //     loader: 'node-loader',
                // },

                // {
                //     test: /\.node$/,
                //     use: [
                //         {
                //             loader: 'native-addon-loader',
                //             options: {
                //                 name: 'native_modules/[name]-[hash].[ext]', // default: '[name].[ext]'
                //                 from: 'js', // default: '.'
                //             },
                //         },
                //     ],
                // },

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

    return merge.smart(commonConfigFn(env), config)
}

module.exports = configFn()
