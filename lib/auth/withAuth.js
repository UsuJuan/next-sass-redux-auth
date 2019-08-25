import React from 'react';
import Router from 'next/router';
import { reauthenticate } from '../../redux/actions/authActions';
import { getCookie } from '../../utils/cookie';

export function makeRedirect(ctx, toUrl) {
  const { req, res } = ctx;
  const isServer = !!req;
  if (isServer) {
    res.writeHead(302, {
      Location: `${toUrl}?next=${req.originalUrl}`
    });
    res.end();
  } else {
    Router.push(`${toUrl}?next=${ctx.asPath}`);
  }
}

const withUserAuth = WrappedComponent => {

  const withUserAuthWrapper = props => {
    return <WrappedComponent {...props} />
  };

  withUserAuthWrapper.getInitialProps = async ctx => {
    const { reduxStore, req } = ctx;
    const isServer = !!req;
    let user = null;
    let token = null;
    // checkServerSideCookie
    if (isServer) {
        if (ctx.req.headers.cookie) {
            token = getCookie('token', ctx.req);
            ctx.reduxStore.dispatch(reauthenticate(token));
        }
    } else {
        token = ctx.reduxStore.getState().authentication.token;
        if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
            setTimeout(function() {
                Router.push('/');
            }, 0);
        }
    }
    if (!token) {
      makeRedirect(ctx, '/login');
    }

    let pageProps = {};
    if (typeof WrappedComponent.getInitialProps === 'function') {
      pageProps = await WrappedComponent.getInitialProps.call(WrappedComponent, ctx);
    }

    return { ...pageProps, user, token };
  };
  return withUserAuthWrapper;
};

export default withUserAuth;
