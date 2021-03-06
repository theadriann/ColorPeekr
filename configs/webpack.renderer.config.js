// utils
const merge = require('webpack-merge')
const webpack = require('webpack')

// configs
const paths = require('./paths.config')
const commonConfigFn = require('./webpack.common.config')

// const rules = require('./webpack.rules');

// rules.push({
//   test: /\.css$/,
//   use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
// });

// module.exports = {
//   // Put your normal webpack config below here
//   module: {
//     rules,
//   },
// };

const configFn = (env = {}) => {
    const config = {
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                src: paths.src,
                renderer: paths.renderer,
                third_party: paths.third_party,
            },
        },

        node: {
            __dirname: false,
            __filename: false,
        },

        module: {
            rules: [
                {
                    test: /\.less|css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                import: true,
                                importLoaders: 1,
                                modules: {
                                    mode: 'global',
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                },

                {
                    test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf|otf|mp4|mp3|cur)$/,
                    loader: 'file-loader?name=assets/[name]-[hash:base64:5].[ext]',
                },
            ],
        },

        plugins: [
            new webpack.ProvidePlugin({
                // utils
                _: 'lodash',
                classnames: 'classnames',

                // React
                React: 'react',
                ReactDOM: 'react-dom',

                // mobx
                mobx: 'mobx',
                mobxReact: 'mobx-react',

                // decorators
                Observer: ['mobx-react', 'observer'],
                Observable: ['mobx', 'observable'],
                Action: ['mobx', 'action'],
                Computed: ['mobx', 'computed'],
                Component: ['renderer/decorators', 'Component'],
                Attribute: ['renderer/decorators', 'Attribute'],
            }),
        ],
    }

    return merge.smart(commonConfigFn(env), config)
}

module.exports = configFn()
