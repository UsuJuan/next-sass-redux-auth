import axios from 'axios';
import { connect } from 'react-redux';
import { reauthenticate, getCookie, checkServerSideCookie, isAuthenticated } from '../redux/actions/authActions.js';
import Router from 'next/router';

import Layout from '../components/Layout.js';

const Whoami = ({ user }) => (
  <Layout title="Who Am I">
    {(user && (
      <div>
        <h2>Who am i</h2>
        {JSON.stringify(user)}
      </div>
    )) ||
      'Please sign in'}
  </Layout>
);

Whoami.getInitialProps = async ctx => {

  const { token } = ctx.store.getState().authentication;

  // return {
  //   user
  // };

  if (token) {
    console.log('Token ===> ', token);
    return { user: token }
    // const response = await axios.get(`http://localhost:8000/api/user/5cccd8b71bed6f30a4921f48`, {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //     contentType: 'application/json'
    //   }
    // });
    // const user = response.data;
    // return {
    //   user
    // };
  }
};

export default connect(
  state => state,
  { reauthenticate }
)(Whoami);
