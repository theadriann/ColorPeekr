// utils
const { merge } = require("webpack-merge");
const webpack = require("webpack");

// configs
const paths = require("./paths.config");
const commonConfigFn = require("./webpack.common.config");

const configFn = (env = {}) => {
    const config = {
        resolve: {
            extensions: [
                ".js",
                ".ts",
                ".jsx",
                ".tsx",
                ".css",
                ".scss",
                "module.scss",
            ],
            alias: {
                src: paths.src,
                renderer: paths.renderer,
                third_party: paths.third_party,
            },
        },

        target: "electron-renderer",

        node: {
            __dirname: false,
            __filename: false,
        },

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                            // options: {
                            //     url: true,
                            //     import: true,
                            //     importLoaders: 1,
                            //     modules: {
                            //         mode: "global",
                            //         localIdentName:
                            //             "[name]__[local]--[hash:base64:5]",
                            //     },
                            // },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                            },
                        },
                    ],
                },

                {
                    test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf|otf|mp4|mp3|cur)$/,
                    loader: "file-loader",
                    options: {
                        name: "assets/[name]-[hash:base64:5].[ext]",
                    },
                },
            ],
        },

        plugins: [],
    };

    return merge(commonConfigFn(env), config);
};

module.exports = configFn();
