import React from "react";
import OverlayStyle from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({close, children}) => {
    return (
        <div className={OverlayStyle.overlay} onClick={close}>
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;
