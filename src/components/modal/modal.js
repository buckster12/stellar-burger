import {useEffect} from "react";
import ModalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({title, onClose, children}) => {
    const escKeyUp = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', escKeyUp);

        return () => {
            window.removeEventListener('keyup', escKeyUp);
        }
    }, []);

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
        document.querySelector("#react-modals")
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

export default Modal;
