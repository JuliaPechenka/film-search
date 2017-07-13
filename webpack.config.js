var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { minimize: true } }],
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            // },
            // {
            //     test: /\.(jpg?g|png|gif|svg)$/i,
            //     loader: "file-loader?name=/content/[name].[ext]"
            // }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        // new ExtractTextPlugin("[name].css")
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;