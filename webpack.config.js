const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src', 'index'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'bower_components')
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						query: {
							limit: 10000,
							mimetype: 'application/octet-stream'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						query: {
							limit: 10000,
							mimetype: 'application/font-woff'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx', '.css']
	},
	devtool: 'source-map',
	devServer: {
		publicPath: path.join('/public/'),
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(['public']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
