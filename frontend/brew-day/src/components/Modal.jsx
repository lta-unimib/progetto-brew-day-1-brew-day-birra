import React from 'react';

const Modal = ({ children, showModal, setShowModal }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div>
            {showModal ? (
                <div className={`modal show`} onClick={() => setShowModal(false)} data-testid="modal" style={{overflowY: "auto",}}>
                    <div className="modal-content" onClick={handleModalClick} style={{width: "75%"}}>
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