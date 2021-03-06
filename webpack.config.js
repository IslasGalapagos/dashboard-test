require('dotenv').config();

const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const {NODE_ENV = 'development'} = process.env;
const isProduction = NODE_ENV === 'production';

module.exports = {
  target: 'web',

  mode: NODE_ENV,
  devtool: isProduction ? 'cheap-source-map' : 'eval',

  entry: {
    bundle: './src/',
    normilize: './node_modules/normalize.css/normalize',
    'datepicker-styles':
      './node_modules/react-datepicker/dist/react-datepicker.css'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.ico$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/favicon.ico'
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PureComponent: ['react', 'PureComponent'],
      PropTypes: 'prop-types'
    }),
    new webpack.DefinePlugin({
      NODE_API_PORT: JSON.stringify(process.env.NODE_API_PORT),
      NODE_API_DOMAIN: JSON.stringify(process.env.NODE_API_DOMAIN)
    })
  ],

  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin()]
  },

  devServer: {
    hot: true
  }
};
