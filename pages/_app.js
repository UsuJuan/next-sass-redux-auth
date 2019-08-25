import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';
import Head from 'next/head';
// import '../static/scss/styles.scss';
import '../static/scss/style.scss';

class ExampleApp extends App {

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>Next.js Starter</title>
        </Head>
        <Provider store={reduxStore}>
          <div>
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(ExampleApp);
