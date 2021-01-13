const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Title',
      template: './index.html' // HtmlWebpackPlugin 自动生成 HTML 文件的模板
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',  
        exclude: /node_modules/, // 表示除了该文件外
      },
    ]
  },
  devServer:{
    port:9000,
    inline:true,
    hot:true
  }  
};