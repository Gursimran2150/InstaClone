import { useContext } from "react";
import StateContext from "../../pages/state/stateContext";
import Button from "../Button";

function CommentModal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className='commentModalContainer'>
            <div className='commentModal'>
                <Button text={"X"} onclick={onClose} />
                {
                    children
                }
            </div>

        </div>
    )
}

export default CommentModal;