const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',

  devtool: false,

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      "..."
    ],
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
    }),
  ],
});