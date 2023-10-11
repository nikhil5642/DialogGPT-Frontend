const withSvgr = require("next-svgr");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
	withSvgr({
		async redirects() {
			return [
				{
					source: "/",
					destination: "/home",
					permanent: true,
				},
			];
		},
		distDir: "build",
	}),
);
