const path = require('path');
// CSS分離用
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = ({outputFile, assetFile}) => ({
    entry: { app: './src/js/app.js' },
    output: {
        path: path.resolve(__dirname, 'public'), //絶対Pathで指定する
        filename: `${outputFile}.js`,
        chunkFilename: `${outputFile}.js`, // splitChunksを使う場合は推奨
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
        }),
        new ProvidePlugin({ // 複数モジュールで共通して使うものをここで定義可能
            jQuery: 'jquery',
            $: 'jquery',
            utils: [path.resolve(__dirname, 'src/js/utils'), 'default']
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendors: {
                    name: "vendors", // 今回はjQueryをこの名前で分割する
                    test: /node_modules/,
                    priority: -10
                },
                utils: {
                    name: "utils",
                    test: /src[\\/]js[\\/]utils/,
                    // chunks: 'async', //この単位でも設定可能
                },
                default: false
            }
        }
    },
    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, 'src/scss'),//@はaliasであることを明示するための手法なのでなくてもよい
            '@imgs': path.resolve(__dirname, 'src/images')
        },
        extensions: ['.js', '.scss'], //jsはデフォルトで指定されている
        modules: [path.resolve(__dirname, 'src'), 'node_modules'] // srcまで省略可能に
    }
});