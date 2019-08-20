import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/public">
        <p>Public Page</p>
      </Link>
      <Link to="/friendslist">
        <p>Protected Page</p>
      </Link>
    </nav>
  )
}

export default Navigation;
