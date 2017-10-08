import path from 'path';
import webpack from 'webpack';

export default {
  
  devtool: 'cheap-module-eval-source-map', 
  entry: [
    'eventsource-polyfill', // ncessary for hot reloading with IE
    'webpack-hot-middleware/client?reload-true', //it reloads the page if hot module reloading fails
    './src/index',
    'babel-polyfill'
  ],
  //entry: './src/index',
  //
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'), //Physical files are only output by the production build tasks 'npm run build'
    publicPath: '/',
    filename: 'bundle.js' //creates bundle in memory
  },
  devServer: {
    contentBase: './src',
    noInfo: false, //false means display all files webpack that its bundling
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(), //deprecated
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
       debug: true
     })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}, //used by bootstap, recommended settings
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'url-loader?limit=5000&name=img/img-[hash:6].[ext]'
            //'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            //'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]}       
    ]
  }
};
