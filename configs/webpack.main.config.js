// utils
const merge = require('webpack-merge')

// configs
const commonConfigFn = require('./webpack.common.config')

const configFn = (env = {}) => {
    const config = {
        entry: './src/main/index.js',

        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            'react-hot-loader/babel',
                            [
                                '@babel/plugin-proposal-decorators',
                                {
                                    legacy: true,
                                },
                            ],
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-transform-react-jsx-source',
                            '@babel/plugin-proposal-function-sent',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-proposal-throw-expressions',
                            [
                                '@babel/plugin-proposal-class-properties',
                                {
                                    loose: true,
                                },
                            ],
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    helpers: true,
                                },
                            ],
                        ],
                    },
                },
            ],
        },
    }

    return merge.smart(commonConfigFn(env), config)
}

module.exports = configFn()
