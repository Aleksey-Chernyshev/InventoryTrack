import { CSSProperties, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css'


interface IModalProps {
    active: boolean;
    onSubmit?: () => void;
    onClose: () => void;
    style?: CSSProperties;
}

const Modal = ({active, onClose, children, style}: PropsWithChildren<IModalProps>) =>{
    if (!active){
        return null;
    }
    const portalDiv = document.getElementById('modal');
    if (!portalDiv) {
        throw new Error("The element #portal wasn't found");
    }
    return createPortal (
        <dialog className={styles.modal} onClick={onClose}>
            <div className={styles.modal_content}
                 onClick={(event) => event.stopPropagation()}
                 style={style}>
                <div className={styles.modal_body}>
                    {children}
                </div>
                <button className={styles.modal_close} onClick={onClose}>
                    X
                </button>
            </div>
        </dialog>,
        portalDiv

    )
};
export default Modal