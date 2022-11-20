import React, {useEffect} from "react";
import ModalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";

type TModalProps = {
    title: string;
    children: React.ReactNode;
    onClose: () => void;

}

const Modal = ({title, onClose, children}: TModalProps) => {
    useEffect(() => {
        const escKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener('keyup', escKeyUp);

        return () => {
            window.removeEventListener('keyup', escKeyUp);
        }
    }, [onClose]);

    const reactModal: Element | null = document.querySelector("#react-modals");
    if (!reactModal) {
        return null;
    }

    return ReactDOM.createPortal(
        <ModalOverlay close={onClose}>
            <div className={ModalStyles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={ModalStyles.card}>
                    <div className={ModalStyles.header}>
                        <h1 className="text text_type_main-medium">{title}</h1>
                        <span className={ModalStyles.icon} onClick={onClose}>
                            <CloseIcon type="primary"/></span>
                    </div>
                    <div className={ModalStyles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalOverlay>,
        reactModal
    );
}

export default Modal;