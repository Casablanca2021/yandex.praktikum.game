const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app-[hash].js'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			modules: path.resolve(__dirname, 'src/modules/'),
			utilities: path.resolve(__dirname, 'src/utilities/'),
			common: path.resolve(__dirname, 'src/common/')
		}
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`
						}
					},
					'css-loader',
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'www/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style-[hash].css'
		})
	]
};
