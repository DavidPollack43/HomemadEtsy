import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupFormPage from '../SignUpFormModal/SignupFormPage';

function LoginFormModal() { // session
  const [showModal, setShowModal] = useState(null);

  return (
    <>
      <button onClick={() => setShowModal("login")} className='loginButton'>Sign In</button>
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