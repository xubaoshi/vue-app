/**
 * Created by xu on 2016/4/13.
 */
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var rootPath = path.resolve(__dirname,'../');

module.exports = {
	entry:{
		bundle:'./src/index',
		vendor:['vue','vuex','vue-router']

	},
	output:{
		path:path.join(rootPath,'dist'),
		filename:'[hash:8].[name].js',
		publicPath:'/'
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress:{warnings:false}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendor",
			minChunks:Infinity
		}),
		new ExtractTextPlugin('[hash:8].style.css', { allChunks: true }),
		new HtmlWebpackPlugin({
			favicon:path.join(rootPath,'./src/favicon.ico'),
			title: "vue-app",
			template: path.join(rootPath,'./src/index.html'),  //模板文件
			inject:'body',
			hash:false,    //为静态资源生成hash值
			minify:{    //压缩HTML文件
				removeComments:false,    //移除HTML中的注释
				collapseWhitespace:true    //删除空白符与换行符
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
			},
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
			//{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap&includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib") ) },
			{
				test: /\.(jpe?g|png|gif)$/i,
				loaders: [
					'url?limit=10000&name=images/[hash:8].[name].[ext]',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			},{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
			}

		]
	},
	resolve: {
		root: path.resolve(rootPath, './node_modules'),
		extensions: ['','.js','.vue','.scss']
	}



}