import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './styles/Navbar.css'

const NavBar = () => {
  return (
    <div className='navbar-background'>
      <nav className='nar-container'>
        <div className="firstbox" >
          <NavLink to='/'
            exact={true}
            activeClassName='active'
            className='home'>
            Home
          </NavLink>
        </div>
        <div className="second_outer_container" >
          <div className="second_container" >
            < NavLink to='/login'
              exact={true}
              activeClassName='active'
              className='login' >
              Log In </NavLink>
          </div >
          <div className="thirdbox" >
            <NavLink to='/sign-up'
              exact={true}
              activeClassName='active'
              className='signup' >
              Sign Up
            </NavLink>
          </div >
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
