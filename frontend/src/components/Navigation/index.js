import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Logo from './homemadEtsy.png'
import Cart from './cart.svg'
import { useEffect } from 'react';
import { fetchCart } from '../../store/cart';
import { useDispatch } from 'react-redux'
import SearchBar from '../SearchBar';


function Navigation(){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser){
      dispatch(fetchCart())
    }
  }, [sessionUser])

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
        <SearchBar />
      <li>
        <NavLink exact to="/cart">
          <img src={Cart} alt="cartImage" className='cartLogo' />
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
