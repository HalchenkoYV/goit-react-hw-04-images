import s from './Modal.module.css';
import React from 'react';

function Modal({ highQualityPic , onClick}) {

    return (
        <div className={s.overlay}  onClick={() => !onClick()}>
            <div className={s.modal} >
                <img className={s.modalPic} src={highQualityPic} alt="2"  />
            </div>
        </div>
    );
};

export default Modal;
