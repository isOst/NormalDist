'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	entry: "./app/app.js",
	output: {
		path: "./dist",
		filename: "index.js"
	},

	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify('eng')
		})
	],

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.styl']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel'
		}, {
			test: /\.styl$/,
			loader: 'style!css!autoprefixer?browsers=last 2 versions!stylus'
		}, {
			test: /\.html$/,
			loader: 'raw'
		}]
	},

	devServer: {
		host: 'localhost',
		port: 8080
	}
};

module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);