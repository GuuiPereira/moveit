import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="favicon.png" type="image/png" rel="shortcut icon" />
                    <link href="https://fonts.gstatic.com" rel="preconnect" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main/>
                    <NextScript></NextScript>
                </body>
            </Html>

        );
    }
}