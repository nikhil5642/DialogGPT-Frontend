import Document, { Html, Head, Main, NextScript } from "next/document";
import { BackGroundSelector } from "src/helper/background-helper";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps, pathname: ctx.pathname };
	}

	render() {
		const background = BackGroundSelector(this.props.pathname);

		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/logo192.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<meta name="theme-color" content="#000000" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className={background}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
