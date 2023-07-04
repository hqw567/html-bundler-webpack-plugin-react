const path = require("path")
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")

module.exports =
	{
		mode: "production",
		//stats: 'normal',
		stats:
			"errors-warnings",

		output:
			{
				path: path.join(
					__dirname,
					"dist/"
				),
				clean: true,
			},
		resolve:
			{
				extensions:
					[
						".js",
						".jsx",
					],
			},
		plugins:
			[
				new HtmlBundlerPlugin(
					{
						entry:
							{
								react:
									{
										import:
											"./src/pages/react/index.html",
										filename:
											"index.html",
									},
							},

						js: {
							filename:
								"js/[name].[contenthash:8].js",
							inline:
								"auto", // BUG!!!    When using React Markdown when JavaScript is inlined, webpack parsing error
						},

						//verbose: true,
					}
				),
			],

		module:
			{
				rules:
					[
						{
							test: /\.(m?js|jsx)$/,
							exclude:
								/(node_modules|bower_components)/,
							use: {
								loader:
									"babel-loader",
								options:
									{
										cacheDirectory: true,
										presets:
											[
												[
													"@babel/preset-react",
												],
											],
									},
							},
						},
					],
			},

		// enable HMR with live reload
		devServer:
			{
				static:
					{
						directory:
							path.join(
								__dirname,
								"dist"
							),
					},
				watchFiles:
					{
						paths:
							[
								"src/**/*.*",
							],
						options:
							{
								usePolling: true,
							},
					},
			},
	}
