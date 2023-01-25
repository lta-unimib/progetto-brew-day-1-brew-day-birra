import React from 'react';

const Modal = ({ children, showModal, setShowModal }) => {
    return (
        <div className={`modal ${showModal ? 'show' : 'hide'}`}>
            <div className="modal-content">
                {children}
            </div>
            <div className="modal-background" onClick={() => setShowModal(false)}></div>
        </div>
    );
}

export default Modal;