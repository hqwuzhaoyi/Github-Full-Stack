import App, { Container } from "next/app";
import { Provider } from 'react-redux'
import "antd/dist/antd.css";

import MyContext from '../lib/my-context'
import Layout from "../components/Layout";
// import store from '../store/store'

import Hoc from '../lib/with-redux'

class MyApp extends App {
    state = {
        context: 'value'
    }

    static async getInitialProps(ctx) {        
        const { Component } = ctx
        console.log("app init");
        let pageProps;
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps
        };
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props;

        // console.log(Component, pageProps)

        return (
            <Container>
                <Layout>
                    <Provider store={reduxStore}>
                        <MyContext.Provider value={this.state.context}>

                            <Component {...pageProps} />

                            <button onClick={() => this.setState({ context: `${this.state.context}213` })}>
                                变长
                        </button>
                        </MyContext.Provider>
                    </Provider>
                </Layout>
            </Container>
        );
    }
}

export default Hoc(MyApp);
