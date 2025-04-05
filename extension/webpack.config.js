const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: './src/popup.ts',
    content: './src/content.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, '../shared/assets/logo'),
          to: path.resolve(__dirname, 'src/logo')
        }
      ]
    })
  ]
}; 