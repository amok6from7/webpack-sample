// HTMLにjsファイルの注入を行う
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = () => webpackMerge(commonConf({outputFile, assetFile}), {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ]
});