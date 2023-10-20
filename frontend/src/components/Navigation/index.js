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
import linkedIn from './linkedInOrange.svg';
import github from './githubOrange.svg'


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
        <li>
          <a href="https://www.linkedin.com/in/david-pollack-22b324292/" target='_blank' className='linkedInA'>
            <img src={linkedIn} alt="" />
          </a>
        </li>
        <li>
          <a href="https://github.com/DavidPollack43" target='_blank' className='githubA'>
            <img src={github} alt="" className='githubI' />
          </a>
        </li>
      </ul>
      <div className='categories'>
        <ul className='catList'>
          <NavLink exact to={`/category/${1}`}>
            <li className='cat'>Jewelry & Accessories</li>
          </NavLink>
          <NavLink exact to={`/category/${2}`}>
            <li className='cat'>Clothing & Shoes</li>
          </NavLink>
          <NavLink exact to={`/category/${3}`}>
            <li className='cat'>Home & Living</li>
          </NavLink>
          <NavLink exact to={`/category/${4}`}>
            <li className='cat'>Wedding & Party</li>
          </NavLink>
          <NavLink exact to={`/category/${5}`}>
            <li className='cat'>Craft Supplies</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
