import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/actions/authActions.js';
import Layout from '../components/layout';

const Signin = ({ authenticate }) => {
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('12345678');

    const handleSubmit = e => {
        e.preventDefault();
        // console.log('login with ', { email, password });
        const user = { email, password };
        authenticate(user);
    };

    return (
        <Layout title="Sign In">
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </Layout>
    );
};

Signin.getInitialProps = ctx => {};

export default connect(
    state => state,
    { authenticate }
)(Signin);
