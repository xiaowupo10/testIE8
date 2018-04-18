const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:{
    main:'./src/main.js'
  },
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[{
      test:/\.js$/,
      loader:'babel-loader'
    },{
      test:/\.css$/,
      loader:'style-loader!css-loader'
    },{
      test:/\.html$/,
      loader:'html-loader'
    },{
      test:/\.(png|jpg|gif|svg)$/,
      loader:'url-loader',
      query:{
        limit:2000000,
        name:'assets/[name].[ext]'
      }
    }]
  },
  devServer:{
    contentBase:path.join(__dirname,'dist'),
    compress:true,
    port:8888
  },
  watchOptions:{
    poll:1000,//检测修改的时间
    aggregateTimeout:500,//防止重复按键，500ms内算按一次
    // ignored:/node_modules/,//不检测
  },
  plugins:[
    new htmlWebpackPlugin({
      title:'My Manage Project',
      template:'index.html',
      inject:'body',
    }),
    new copyWebpackPlugin([{
      from:'public/',
      to:'public'
    }])
  ]
}