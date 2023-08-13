module.exports = {
	env: {
		commonjs: true,
		node: true,
		browser: true,
		es6: true,
		jest: true,
	},
	globals: {},
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module",
	},
	plugins: ["react", "import", "react-hooks"],
	rules: {},
};
