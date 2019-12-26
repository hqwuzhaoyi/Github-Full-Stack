import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

function withLog(Comp) {
    return (props) => {
        console.log(props);
        return <Comp {...props} />
    }
}

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage
        const sheet = new ServerStyleSheet()
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />)
            })

            const props = await Document.getInitialProps(ctx)

            return {
                ...props,
                style: (
                    <>{props.styles}{sheet.getStyleElement()}</>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return <Html>
            <Head>
            </Head>
            <body className="test">
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}

export default MyDocument