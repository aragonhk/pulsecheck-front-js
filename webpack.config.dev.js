const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  //entry: './src/index',
  //debug: true,
  devtool: 'inline-source-map',
  devServer: {
    noInfo: false,
  },  
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
