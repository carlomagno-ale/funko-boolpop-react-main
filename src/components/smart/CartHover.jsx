import { useCartContext } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import Loader from "../dumb/Loader.ui";
import styles from "../../assets/css_modules/CartHover.module.css";

export default function CartHover({ onClose }) {
  const { cart, deleteFromCart } = useCartContext();
  const navigate = useNavigate();

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  if (cart.userCart.length == 0) {
    return (
      <>
        <div className="container empty_cart">
          <h3>Il tuo carrello è vuoto</h3>
          <p className="fs-2">
            <i class="bi bi-emoji-frown-fill"></i>
          </p>
        </div>
      </>
    );
  }
  switch (cart.state) {
    case "loading":
      return (
        <>
          <Loader />
        </>
      );
    case "success":
      return (
        <>
          <div className="hover_cart my-4">
            <div className="container mb-4">
              <div className="hover_cart_body">
                <div className="container">
                  <table class={`${styles.table_hover} table`}>
                    <thead>
                      <tr>
                        <th scope="col">Immagine</th>
                        <th scope="col" className="cart_hover_display">
                          Nome
                        </th>
                        <th scope="col" className="cart_hover_display">
                          Prodotto
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Prezzo*
                        </th>
                        <th scope="col">Q.tà</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody className={styles.table_hover}>
                      {cart.userCart.map((item) => (
                        <>
                          <tr>
                            <td className="w-100">
                              <div
                                className={`${styles.img_container} cart_img_container`}
                              >
                                <img
                                  onClick={() => navigate(`/${item.slug}`)}
                                  className={`${styles.img} cart_img`}
                                  src={`http://localhost:3000/${item.images[0].image}`}
                                  alt={item.name}
                                />
                              </div>
                            </td>
                            <td className="cart_hover_display">
                              {truncateText(item.name, 10)}
                            </td>
                            <td className="cart_hover_display">
                              {item.promotion.length > 0 ? (
                                <>
                                  <span>{item.promotion[0].discount}%</span>
                                </>
                              ) : (
                                <>Nessuna promozione trovata</>
                              )}
                            </td>
                            <td>
                              {item.promotion.length > 0 ? (
                                <>
                                  <label>
                                    <span
                                      className={`${styles.price_tag_hover} price_label_card text-success fs-6`}
                                    >
                                      {(
                                        (item.price *
                                          item.promotion[0].discount) /
                                        100
                                      ).toFixed(2)}
                                      {""}€
                                    </span>
                                  </label>
                                </>
                              ) : (
                                <>
                                  <label className="price_label_card">
                                    {item.price} €
                                  </label>
                                </>
                              )}
                            </td>
                            <td className="text-center">
                              X{item.cartQuantity}
                            </td>
                            <td className="text-center">
                              <div class="btn-group">
                                <button
                                  class={`${styles.btn_dropdown} btn  btn-sm dropdown-toggle`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="bi bi-three-dots"></i>
                                </button>
                                <ul class="dropdown-menu text-center">
                                  <button
                                    onClick={() => deleteFromCart(item)}
                                    className={`${styles.btn_del} btn  mx-2 my-2`}
                                  >
                                    <i class="bi bi-trash"></i>
                                  </button>
                                  <button
                                    onClick={() => navigate(`/${item.slug}`)}
                                    className={`${styles.btn_watch} btn`}
                                  >
                                    <i class="bi bi-eye"></i>
                                  </button>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <div className="total_hover_cart">
                    <h6 className="text-end">TOTALE:</h6>
                    <h5 className="text-end">{cart.amount.toFixed(2)}</h5>
                  </div>

                  <button
                    onClick={() => {
                      if (onClose) onClose();
                      navigate(`/cart`);
                    }}
                    className={`${styles.btn_show} btn fs-5 my-2 my-sm-0 mx-3`}
                    type="submit"
                  >
                    Vai al carrello
                  </button>
                  <button
                    onClick={() => {
                      if (onClose) onClose();
                      navigate(`/checkout`);
                    }}
                    className={`${styles.btn_proceed} btn fs-5 my-2 my-sm-0`}
                    type="submit"
                  >
                    Procedi al pagamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
}
