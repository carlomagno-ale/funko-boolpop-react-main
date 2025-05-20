import { useEffect } from "react"

export default function CartOffcanvas({ isOpen, onClose, children }) {


    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-backdrop" onClick={onClose}></div>
            <aside className="cart-offcanvas">
                <button className="cart-close-btn" onClick={onClose}>X</button>
                <div className="cart-content">
                    {children}
                </div>
            </aside>
        </>
    )
}