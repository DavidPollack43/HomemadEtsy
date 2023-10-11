import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../store/modal_reducer';

const Modal = (props) => {
    const dispatch = useDispatch();
    const modalType = useSelector(state => state.modal);

    if (!modalType){
        return null;
    }

    let component;
    switch (modalType) {
        case "sign_in":
            component = <SignInForm />;
            break;
        default:
            return null;
    }

    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(closeModal());
    }

    return (
        <div className='modal-background'>
            {component}
            <button onClick={handleClick}>X</button>
        </div>
    )
}

export default Modal

