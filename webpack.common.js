const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const globImporter = require("node-sass-glob-importer");

const generateHtmlPlugins = () =>
    glob.sync("./src/views/pages/*.twig").map(
        (dir) =>
        new HtmlWebpackPlugin({
            filename: path.basename(dir).replace(".twig", ".html"), // Output
            template: dir, // Input
            title: "Custom template using Handlebars",
            chunks: true,
        })
    );

module.exports = {
    mode: "development",
    devServer: {},
    entry: {
        styles: "./src/scss/styles.scss",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "vendor/vendor.js",
        chunkFilename: "[id].[hash:8].js",
    },
    module: {
        rules: [{
                test: /\.twig$/,
                use: [
                    "raw-loader",
                    {
                        loader: "twig-html-loader",
                        options: {
                            data: {},
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {},
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                importer: globImporter(),
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                loader: "url-loader?name=assets/fonts/[name].[ext]",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "/assets/images/[name].[ext]",
                    },
                }, ],
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CopyPlugin({
            patterns: [{
                    from: "src/assets/libs",
                    to: "assets/libs"
                },
                {
                    from: "src/assets/images",
                    to: "assets/images"
                },
                {
                    from: "src/js",
                    to: "js"
                },
            ],
        }),
        ...generateHtmlPlugins(),
    ],
    // .concat(htmlPlugins),
};