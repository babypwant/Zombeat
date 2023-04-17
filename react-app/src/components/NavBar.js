import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFeaturedPlaylists } from '../store/featured';
import { getAccessToken } from '../store/spotify';
import LogoutButton from './auth/LogoutButton';
import './styles/Navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  console.log(user)
  const token = useSelector(state => state?.token?.token?.access_token)
  const dispatch = useDispatch();


  useEffect(() => {
    if (!token) {
      (async () => {

        await dispatch(getAccessToken())
      })()
    }
    if (user) {
      (async () => {
        const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
          method: "GET",
          headers: { 'Authorization': 'Bearer ' + token }
        })
        const data = await response.json()
        dispatch(setFeaturedPlaylists(data.playlists?.items))
      })()
    }
  }, [dispatch, token, user]);

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
