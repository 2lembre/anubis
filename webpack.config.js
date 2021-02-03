const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nameApp = 'Anúbis'

let htmlConfig = {
  hash: true,
  title: nameApp,
  favicon: './src/favicon.ico',
  template: './src/index.html',
  filename: 'index.html',
  meta: {
    'author': '2lembre',
    'viewport': 'width=device-width, initial-scale=1.0',
    'application-name': nameApp,
    'msapplication-config': process.env.NODE_ENV === 'production' ? '/anubis/browserconfig.xml' : '/browserconfig.xml',
    'msapplication-TileColor': '#000000',
    'theme-color': '#ffffff'
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(process.env.NODE_ENV === 'production' ? Object.assign(htmlConfig, { pathAnubis: '/anubis' }) : htmlConfig),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
          transform(content) { return process.env.NODE_ENV === 'production' ? content : content.toString().replace(/anubis\//gi, '') },
        },
        {
          from: "src/browserconfig.xml",
          to: "browserconfig.xml",
          transform(content) { return process.env.NODE_ENV === 'production' ? content : content.toString().replace(/anubis\//gi, '') },
        },
        { from: "src/assets", to: "assets" },
      ],
    }),
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
