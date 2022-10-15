import React from "react";
import OverlayStyle from "./modal-overlay.module.css";

type TModalOverlay = {
    close: () => void,
    children: React.ReactNode
}

const ModalOverlay = ({close, children}: TModalOverlay) => {
    return (
        <div className={OverlayStyle.overlay} onClick={close}>
            {children}
        </div>
    );
}

export default ModalOverlay;
