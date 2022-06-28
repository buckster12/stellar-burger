import React from "react";
import OverlayStyle from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalOverlay = ({close, children}) => {
    return ReactDOM.createPortal(
        <div className={OverlayStyle.overlay} onClick={close}>
            {children}
        </div>,
        document.getElementById('react-modals')
    );
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;
