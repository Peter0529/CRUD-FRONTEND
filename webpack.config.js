var webpack = require('webpack');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const Path = require("path");
var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `/src` is source
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/dist', // `/dist` is the destination
    filename: 'bundle.js', // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // rule for .js files
        exclude: /node_modules/,
        loader: "babel-loader", // apply this loader for js files
        query: {
              presets: ['@babel/react']       
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // the order is important. it executes in reverse order !
          'css-loader' // this will load first !
        ]
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
     }
    ]
  },
//   plugins: [
//     new HtmlWebPackPlugin({
//       //  template: path.resolve( __dirname, 'src/public','index.html' ),
//       // template:"/public/index.html"
//       //  filename: 'index.html'
//       title:"index"
//     })
//  ]
  devServer: {
    contentBase: Path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    open: true,
    disableHostCheck: true,
  }
};

module.exports = config;