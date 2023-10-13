import React from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';
import { useState } from 'react';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(true);
    
    return (
        <>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignupFormPage />
            </Modal>
        )}
        </>
    )
}

export default SignupFormModal;
