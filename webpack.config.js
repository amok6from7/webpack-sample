const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'none',
    entry: { app: './src/app.js' },
    output: {
        path: path.resolve(__dirname, 'public'), //絶対Pathで指定する
        filename: '[name].js' // [name]: entryで指定したkeyが入る [chunkhash]:再ビルド必要な範囲のみを1単位とする
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                enforce: 'pre', // 順序を優先的にする
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.scss$/,
                use: [
                    //'style-loader',
                    MiniCssExtractPlugin.loader,//cssを別ファイルで出力
                    'css-loader',
                    'postcss-loader',
                    'sass-loader' //下から実行されるので順番に気を付ける
                ]
            },
            {
                test: /\.(jpe?g|png)$/, // jpg, jpeg, png
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',//'[contenthash].[ext] hash:高速化やキャッシュ対策用途 ext:拡張子の総称
                            outputPath: 'images',
                            publicPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}