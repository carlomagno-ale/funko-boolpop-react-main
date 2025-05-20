import { Outlet } from "react-router-dom"
import Header from "../components/smart/Header"
import Footer from "../components/smart/Footer"
import CartHover from "../components/smart/CartHover"
import CartOffcanvas from "../components/smart/CartOffcanvas"
import { useState } from "react"
import ChatButton from "../components/dumb/ChatButton.ui"
import ChatBot from "../components/smart/ChatBot"


export default function () {

    const [isCartOpen, setCartOpen] = useState(false)
    const [isChatOpen, setChatOpen] = useState(false)

    return (
        <>
            <div className="app-layout">
                <Header setCartOpen={setCartOpen} />
                <CartOffcanvas isOpen={isCartOpen} onClose={() => setCartOpen(false)}>
                    <h3>Il Tuo Carrello</h3>
                    <CartHover onClose={() => setCartOpen(false)} />
                </CartOffcanvas>

                <main className="main-content">
                    <Outlet setCartOpen={setCartOpen} />
                    <ChatButton
                        setChatOpen={setChatOpen}
                        isOpen={isChatOpen}
                    />
                    {isChatOpen && (
                        <ChatBot onClose={() => setChatOpen(false)} />
                    )}
                </main>
                <Footer />
            </div >
        </>
    )
}