import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Logo from './homemadEtsy.png'
import Cart from './cartGrey.svg'
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
    <>
      <ul>
        <li>
          <NavLink exact to="/">
              <img className='logo' src={Logo} alt="HomemadEtsy_Logo" />
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
      <div className='categories'>
        <ul className='catList'>
          <li className='cat'>Jewelry & Accessories</li>
          <li className='cat'>Clothing & Shoes</li>
          <li className='cat'>Home & Living</li>
          <li className='cat'>Wedding & Party</li>
          <li className='cat'>Craft Supplies</li>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
