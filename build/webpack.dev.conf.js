'use strict' 
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

const HtmlWebpackPluginConfig = {
    title: '综合案例', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html
    template: './src/template/tpl.html', //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，
    inject: 'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}

module.exports = {
	mode: 'development',
	entry: {
		app: './src/main'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../dist'), //网站根目录
		host: 'localhost',
		port: 6378,
		compress: true, //压缩
		open: false, // 自动打开浏览器
		inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
		hot: false, //模块热替换
		index: 'front.html' // 与HtmlWebpackPlugin中配置filename一样

	},
	plugins: [
		new CleanWebpackPlugin(['../dist']),
		new UglifyJsPlugin(),
		new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
		new webpack.DefinePlugin({BJ: JSON.stringify('北京'),}), //webpack实例的一个方法，该插件相当于apache等web服务器上定义一个常量
		new webpack.BannerPlugin({
			banner: '每一次靠近，总是那么悄悄的'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: [
				// 	'style-loader',
				// 	'css-loader'
				// ]
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|bmp)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
							outputPath: 'img/'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: 'file-loader'
			},
			{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192000
		            }
		          }
		        ]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					"babel-loader",
					"eslint-loader", // 顺序是 自底向上执行
				],
			},
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'], //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
/*	    alias: {
	      'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
	      '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
	      '#': path.resolve('src/ui/components') import Table from '#/table'
	    }*/
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		hashDigestLength: 10 // 默认长度是20
	}
}