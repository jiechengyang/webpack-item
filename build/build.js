'use strict' 
const webpack = require('webpack')

const webpackConfig = require('./webpack.dev.conf.js')

const compiler = webpack(webpackConfig)

webpack(webpackConfig, (err, stats) => {
	if (err)
		throw err 
	console.log('已打包好了，我们做点别的事')
})

// 编译器运行比上面要快些，但它没有包括watch部分，没有监视，只是编译
/*compiler.run((err, stats) => {
	if (err)
		throw err 
	console.log('已打包好了，我们做点别的事...')	
})*/

// 既监视又编译

// const watching = compiler.watch({

// }, function (err, stats) {
// 	console.log('我一直在监视着呢');
// })