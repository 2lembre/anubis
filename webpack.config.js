const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       use: {
        loader: 'file-loader',
        options: {
          outputPath: './assets/',
          name: '[name].[ext]',
        }
      },
     },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  module.exports.mode = 'development'
  module.exports.devtool = 'inline-source-map'
  module.exports.devServer = { contentBase: './docs' }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production'
  module.exports.output = Object.assign(module.exports.output, { publicPath: '/anubis/' })
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
  }
}
