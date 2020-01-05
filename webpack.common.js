const path = require('path');
// CSS分離用
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({outputFile, assetFile}) => ({
    entry: { app: './src/app.js' },
    output: {
        path: path.resolve(__dirname, 'public'), //絶対Pathで指定する
        filename: `${outputFile}.js`
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
                            name: `${assetFile}.[ext]'`,//'[contenthash].[ext] hash:高速化やキャッシュ対策用途 ext:拡張子の総称
                            outputPath: 'images',
                            publicPath: 'images',
                            esModule: false // これいれないと [object Module] として出力されたので追加
                        }
                    }
                ]
            },
            {
                // HtmlWebpackPlugin でimgのあるHTMLを読み込んでいないと動かないので注意する
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [ // newしてインスタンス化する必要がある
        new MiniCssExtractPlugin({
            filename: `${outputFile}.css`
        })
    ]
});