import React from 'react';

const Modal = ({ children, showModal, setShowModal }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={handleModalClick}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
