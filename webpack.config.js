var LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	module: {
		rules: [{
			test: /\.ts$/,
			use: [{
				loader: 'ts-loader'
			}]
		}]
	},
	plugins: [
		new LiveReloadPlugin()
	]
};