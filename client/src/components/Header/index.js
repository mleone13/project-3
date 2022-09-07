import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

//the functionality in this page needs to link up with Home.js

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="primary-header">
      <div>
        <Link to="/">
          <h1>Plenty of Pups</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>

              {/* <Link to="/login">Login</Link> */}

            </>
          )}
        </nav>
      </div>
      </nav>
  );
};


export default Header;
