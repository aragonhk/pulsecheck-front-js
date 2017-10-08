import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  //debug: true,
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
    //images: path.resolve(__dirname, 'src/public/images')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    contentBase: './src',
    noInfo: false, //false means display all files webpack that its bundling
  },
  plugins: [
    //Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),


    //Hash the files using MD5 so that their names changes when the content changes
    new WebpackMd5Hash(),


    //Use CommonChunkPlugin to create a separate bundle
    //of vendor libraries so that they are cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //Create HTML file that includes reference to bundle JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        remoteEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    //Eliminate duplicate packages when generating bundle
    //new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      //{test: /(\.css)$/, loaders: ['style-loader', 'css-loader?sourcemap']},
      {test: /(\.css)$/,  use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?sourcemap" })},
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
     // {test: /\.css$/, loaders: ['style','css']}
    ]
  }
};
