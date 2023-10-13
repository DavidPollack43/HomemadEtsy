import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Logo from './homemadEtsy.png'


function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
            <img src={Logo} alt="HomemadEtsy_Logo" />
        </NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
