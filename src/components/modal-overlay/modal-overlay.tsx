import React, {FC} from "react";
import OverlayStyle from "./modal-overlay.module.css";

type TModalOverlay = {
    close: () => void,
    children: React.ReactNode
}

const ModalOverlay: FC<TModalOverlay> = ({close, children}) => {
    return (
        <div className={OverlayStyle.overlay} onClick={close}>
            {children}
        </div>
    );
}

export default ModalOverlay;
