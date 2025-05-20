import { useCartContext } from "../contexts/cartContext";
import OrderListUi from "../components/dumb/OrderList.ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/dumb/Loader.ui";
import Styles from "../assets/css_modules/btnCheckout.module.css";

export default function SuccessCheckout() {
  const { unloadCart, cart } = useCartContext();

  const navigate = useNavigate();

  const [postCart, setPostCart] = useState({
    state: "loading",
    amount: 0,
    shipping: 0,
    data: [],
  });

  useEffect(() => {
    const existingPostCart = JSON.parse(sessionStorage.getItem("postCart"));
    if (existingPostCart) {
      setPostCart({
        state: "success",
        amount: existingPostCart.amount,
        shipping: existingPostCart.shipping,
        data: existingPostCart.userCart,
      });
    } else {
      if (cart.userCart.length > 0) {
        const cartCopy = {
          amount: cart.amount,
          shipping: cart.shipping,
          userCart: cart.userCart,
        };
        sessionStorage.setItem("postCart", JSON.stringify(cartCopy));
        setPostCart({
          state: "success",
          amount: cart.amount,
          shipping: cart.shipping,
          data: cart.userCart,
        });
        unloadCart();
      } else {
        setPostCart({ state: "error" });
      }
    }

    return () => {
      sessionStorage.removeItem("postCart");
      sessionStorage.removeItem("clientSecret");
    };
  }, []);

  function deleteSecret() {
    sessionStorage.removeItem("clientSecret");
    sessionStorage.removeItem("postCart");
  }

  switch (postCart.state) {
    case "loading":
      return (
        <>
          <div className="container text-center my-5">
            <h1>Abbiamo ricevuto correttamente il tuo ordine!</h1>
            <div>
              <i class="bi bi-check-circle text-success fs-1"></i>
            </div>
            <h4>Controlla la tua email per ulteriori dettagli</h4>
            <div className="container">
              <h3>Your order</h3>
              <div className="border rounded-5 p-3 w-50 m-auto">
                <Loader />
              </div>
            </div>
          </div>
        </>
      );
    case "success":
      return (
        <>
          <div className="container text-center my-5">
            <h1>Abbiamo ricevuto correttamente il tuo ordine!</h1>
            <div>
              <i class="bi bi-check-circle text-success fs-1"></i>
            </div>
            <h4>Controlla la tua email per ulteriori dettagli</h4>
            <div className="container">
              <h3>Il tuo ordine: </h3>
              <div className="order_container border rounded-5 p-3 m-auto">
                <OrderListUi orderList={postCart} />
                <div>
                  <h4>
                    Totale: {(postCart.amount + postCart.shipping).toFixed(2)} €
                  </h4>
                </div>
              </div>
              <button
                onClick={() => {
                  deleteSecret();
                  navigate("/");
                }}
                className={`${Styles.btn_checkout} btn my-4 fs-3`}
              >
                Torna alla Home
              </button>
            </div>
          </div>
        </>
      );
    case "error":
    default:
      return (
        <main className="container text-center my-5">
          <h1>Qualcosa è endato storto</h1>
          <h4>Non siamo riusciti a recupare i dettagli del tuo ordine</h4>
          <button
            onClick={() => navigate("/")}
            className={`${Styles.btn_checkout} btn my-4 fs-3`}
          >
            Torna alla Home
          </button>
        </main>
      );
  }
}
