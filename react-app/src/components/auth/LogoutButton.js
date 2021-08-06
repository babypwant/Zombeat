import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router';
import '../styles/Navbar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='logout' onClick={onLogout}>
      <button className='logout-button' >Logout</button>
    </div>
  );
};

export default LogoutButton;
