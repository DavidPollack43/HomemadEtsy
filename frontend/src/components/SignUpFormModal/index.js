import React from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';
import { useState } from 'react';

function SignupFormModal({showSignup, setShowSignup}) {
    const [showModal, setShowModal] = useState(true);
    
    const handleClick = (e) => {
        e.preventDefault();
        setShowSignup(false);
        setShowModal(false);
    }
    return (
        <>
        {showModal && (
            <Modal onClose={(handleClick)}>
                <SignupFormPage />
            </Modal>
        )}
        </>
    )
}

export default SignupFormModal;
