const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: './src/app/app.js',
        vendor: ['core-js', 'jquery', 'bootstrap', 'lodash']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './app/[name].[chunkhash].js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {test: /\.css$/, use: ExtractTextWebpackPlugin.extract({use: ['css-loader']})},
            {test: /\.(jpg|png|svg|ttf|woff|woff2|eot)$/, use: 'url-loader?limit=25000'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
        new HtmlWebpackPlugin({template:'src/index.html'}),
        new ExtractTextWebpackPlugin('app/app.[chunkhash].css'),
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
        new BundleAnalyzerPlugin({
            reportFilename: '../public/bundle-report.html',
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            openAnalyzer: false})
    ],
    devServer: {
      contentBase: 'public/',
      proxy: {
        '/api': {
          target: {
            host: "0.0.0.0",
            protocol: 'http:',
            port: 8888
          },
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
}
