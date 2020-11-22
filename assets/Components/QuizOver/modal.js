import React from 'react'

const Modal = ({ showModal, children, closeModal }) => {
    return(
        showModal && (
            <div className="modalBackground" onClick={closeModal}>
                <div className="modalContainer">
                    { children }
                </div>
            </div>
        )
    )
}
export default Modal