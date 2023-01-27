import React from 'react';

const Modal = ({ children, showModal, setShowModal }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div>
            {showModal ? (
                <div className={`modal show`} onClick={() => setShowModal(false)} data-testid="modal">
                    <div className="modal-content" onClick={handleModalClick}>
                        {children}
                    </div>
                </div>
            ) : (
                <div className={`modal hide`} onClick={() => setShowModal(false)} data-testid="modal"></div>
            )}
        </div>
    );
}

export default Modal;