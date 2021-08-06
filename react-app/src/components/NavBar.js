import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken } from '../store/spotify';
import LogoutButton from './auth/LogoutButton';
import './styles/Navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAccessToken())
      console.log(1)
    }
  }, [dispatch])
  if (user) {
    return (
      <div className='navbar-background'>
        <nav className='nar-container'>
          <div className="second_container">
            <NavLink to='/dashboard'
              className='login'>
              Dashboard
            </NavLink>
          </div>
          {/* <div className='avatar-container'>
            <img classnName='user-avatar' src={user?.avatar} />
          </div> */}
          <LogoutButton />
          <div>
          </div>
        </nav>
      </div>
    )
  } else {
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
}

export default NavBar;
