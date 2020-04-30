module.exports = (env = {}) => {
    const commonConfig = {
        mode: process.env.NODE_ENV || 'development',

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

    return commonConfig
}
