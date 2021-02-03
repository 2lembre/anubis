const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nameApp = 'Anúbis'
const env_prod = process.env.NODE_ENV === 'production'

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
    'msapplication-config': env_prod ? '/anubis/browserconfig.xml' : '/browserconfig.xml',
    'msapplication-TileColor': '#000000',
    'theme-color': '#ffffff'
  }
}

function replaceAnubis (text) {
  return text.replace(/anubis\//gi, '')
}

module.exports = {
  mode: env_prod ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: env_prod ? '/anubis/' : '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(env_prod ? Object.assign(htmlConfig, { pathAnubis: '/anubis' }) : htmlConfig),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
          transform(content) { return env_prod ? content : replaceAnubis(content.toString()) },
        },
        {
          from: "src/browserconfig.xml",
          to: "browserconfig.xml",
          transform(content) { return env_prod ? content : replaceAnubis(content.toString()) },
        },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: ["postcss-preset-env", "autoprefixer"] },
            },
          },
          'stylus-loader'
        ],
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
     {
        test: /\.js$/,
        exclude: /node_modules|docs/,
        use: [,
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      },
    ],
  },
};

if (env_prod) {
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
  }
} else {
  module.exports.devtool = 'inline-source-map'
  module.exports.devServer = { contentBase: './docs' }
}
