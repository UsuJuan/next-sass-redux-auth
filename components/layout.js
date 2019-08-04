import React from 'react';
import NavBar from './navBar';

export default function Layout (props) {
  return (<div>
    <NavBar />
    {props.children}
  </div>)
}
