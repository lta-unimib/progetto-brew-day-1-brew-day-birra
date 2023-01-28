import React from 'react';

const Modal = ({ children, showModal, setShowModal }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={() => setShowModal(false)}
                style={{overflowY: "auto",}}>
            <div className="modal-content" onClick={handleModalClick} style={{width: "75%"}}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
