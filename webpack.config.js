const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			template: "./src/sass/main.scss",
			filename: "main.css"
		}),
		new webpack.ProvidePlugin({
			_: "underscore"
		})
	],

	module: {
		rules: [
			{

				test: /\.ejs$/, loader: 'ejs-loader'

				/* test: /\.ejs$/,
				loader: 'ejs-loader',
				query: {
					variable: 'data',
					interpolate: '\\{\\{(.+?)\\}\\}',
					evaluate: '\\[\\[(.+?)\\]\\]'
				}
 				*/
			},
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src/js')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.js$/,
				/* ... */
			},
			{
				// Apply rule for .sass, .scss or .css files
				test: /\.(sa|sc|c)ss$/,

				// Set loaders to transform files.
				// Loaders are applying from right to left(!)
				// The first loader will be applied after others
				use: [
					{
						// After all CSS loaders we use plugin to do his work.
						// It gets all transformed CSS and extracts it into separate
						// single bundled file
						loader: MiniCssExtractPlugin.loader
					},
					{
						// This loader resolves url() and @imports inside CSS
						loader: "css-loader",
					},
					{
						// Then we apply postCSS fixes like autoprefixer and minifying
						loader: "postcss-loader"
					},
					{
						// First we transform SASS to standard CSS
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
							includePaths: [path.resolve(__dirname, 'node_modules')]
						}
					}
				]
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};
