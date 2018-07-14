
const fs                 = require('fs')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer       = require('autoprefixer')
const webpack            = require('webpack')
const path               = require('path')
const rootDir            = fs.realpathSync(process.cwd())
const resolvePath        = relativePath => path.resolve(rootDir, relativePath)

module.exports = {
    context: __dirname,
    entry:   {
        main:    './src/App.jsx',
        browser: './src/Browser.jsx'
    },
    output: {
        path:                   path.join(__dirname, 'build'),
        filename:               '[name].js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename:  'hot/hot-update.json'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json'
        ],
        alias: {
            app:         resolvePath('src'),
            src:         resolvePath('src'),
            third_party: resolvePath('third_party')
        },
        aliasFields: [
            'browser'
        ],
        mainFields: [
            'webpack',
            'browser',
            'web',
            'browserify',
            [
                'jam',
                'main'
            ],
            'node',
            'main'
        ]
    },
    module: {
        rules: [
            {
                test:    /\.(js|jsx)$/,
                exclude: [
                    /node_modules/
                ],
                use: {
                    loader:  'babel-loader',
                    options: {
                        presets: [
                            [
                                require.resolve('babel-preset-env'),
                                {
                                    targets: {
                                        browsers: {
                                            browsers: [
                                                'last 2 versions'
                                            ],
                                            localIdentName: 'color-peekr--[name]--[local]--[hash:base64:5]'
                                        }
                                    }
                                }
                            ],
                            require.resolve('babel-preset-react')
                        ],
                        plugins: [
                            'babel-plugin-transform-object-rest-spread',
                            'babel-plugin-transform-function-bind',
                            'babel-plugin-transform-decorators-legacy',
                            'babel-plugin-transform-class-properties'
                        ].map(require.resolve)
                    }
                }
            },
            {
                test: /\.css$/g,
                use:  [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/g,
                use:  [
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: {
                            importLoaders:  true,
                            localIdentName: '[path][name]--[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader:  'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({ browsers: ['last 2 versions'] })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test:   /\.node$/g,
                loader: 'node-loader'
            },
            {
                test:   /\.(gif|png|jpg|svg|eot|woff|woff2|ttf|mp4|cur)$/g,
                loader: 'file-loader?name=assets/[name]-[sha512:hash:base64:7].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:  'ColorPeekr',
            chunks: [
                'main'
            ],
            inject:   false,
            template: require.resolve('./src/index.ejs')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({ _: 'lodash', React: 'react' }),
        new CleanWebpackPlugin([ 'build' ])
    ],
    devServer: {
        hot:         true,
        port:        9000,
        compress:    true,
        contentBase: path.join(__dirname, 'build')
    },
    devtool: 'source-map',
    target:  'atom'
}
