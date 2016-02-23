var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'vendor': './app/vendor',
    'app': './app/main'
  },
  output: {
    path: __dirname,
    filename: './public/[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', './public/vendor.bundle.js'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    inline: true
  }
}