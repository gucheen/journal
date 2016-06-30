var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    vendor: './app/vendor.ts',
    app: './app/main.ts',
    polyfills: './app/polyfills.ts'
  },
  output: {
    path: helpers.root('public'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],
  devServer: {
    inline: true,
    historyApiFallback: true,
    stats: 'minimal'
  }
};
