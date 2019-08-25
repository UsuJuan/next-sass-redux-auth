import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Home = ({ logout, user, someState}) => {

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  if (!user) {
    return (
      <div>
        No user found
        <br />
        <Link href="/private">
          <a>Private</a>
        </Link>
        <h3><strong>Some State :</strong>{someState}</h3>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Hi {user.username}</h1>
      <h2>A dead simple, responsive boilerplate.</h2>
      <h3><strong>Some State :</strong>{someState}</h3>
      <a href="/api/logout" onClick={handleLogout}>
        Logout
      </a>
      <br />
      <Link href="/private">
        <a>Private</a>
      </Link>
      <br />
      <Link href="/post/12">
        <a>A post</a>
      </Link>
      <br />
    </div>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Home;
