//
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (env = {}) => {
    const commonConfig = {
        mode: process.env.NODE_ENV || 'development',

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules|\.webpack)/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                },
            ],
        },

        plugins: [new ForkTsCheckerWebpackPlugin()],
    }

    return commonConfig
}
