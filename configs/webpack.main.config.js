// utils
const { merge } = require('webpack-merge')

// configs
const commonConfigFn = require('./webpack.common.config')

const configFn = (env = {}) => {
    const config = {
        entry: './src/main/index.ts',

        target: 'electron-main',

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
                    test: /native_modules\/.+\.node$/,
                    use: 'node-loader',
                },

                {
                    test: /\.(m?js|node)$/,
                    parser: { amd: false },
                    use: {
                        loader: '@vercel/webpack-asset-relocator-loader',
                        options: {
                            outputAssetBase: 'native_modules',
                        },
                    },
                },
            ],
        },
    }

    return merge(commonConfigFn(env), config)
}

module.exports = configFn()
