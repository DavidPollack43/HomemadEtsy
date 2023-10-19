import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupFormPage from '../SignUpFormModal/SignupFormPage';

function LoginFormModal(props) { // session
  const {isAddToCart} = props;
  const [showModal, setShowModal] = useState(null);

  return (
    <>
      <button onClick={() => setShowModal("login")} className={isAddToCart ? 'addToCartButton' : 'loginButton' }>{isAddToCart ? "Sign in to add to cart" : "Sign In"}</button>
      {showModal === "login" && (
        <Modal onClose={() => setShowModal(null)}>
          <LoginForm showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
      {showModal === "signup" && (
        <Modal onClose={() => setShowModal(null)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;