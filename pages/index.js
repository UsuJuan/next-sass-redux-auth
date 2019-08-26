import { connect } from 'react-redux';
import { compose } from 'redux';
import Home from '../components/Home';
import withUserAuth from '../lib/auth/withAuth';
import { logout } from '../redux/actions/loginActions.js';

const mapStateToProps = state => {
  return {
    someState: 'lalala'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default compose(
  withUserAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
