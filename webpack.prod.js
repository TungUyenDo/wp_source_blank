const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "vendor/vendor.js",
        chunkFilename: "[id].[hash:8].js",
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                sourceMap: false,
                extractComments: 'all',
                terserOptions: {
                    compress: {
                        pure_funcs: [
                            'console.log',
                            'console.info',
                            'console.debug',
                            'console.warn'
                        ]
                    }
                 }
            })
        ],
    },
});
