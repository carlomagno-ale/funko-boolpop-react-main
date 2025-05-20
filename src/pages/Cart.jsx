import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";
import styles from "../assets/css_modules/CartPage.module.css";
import btnStyles from "../assets/css_modules/btnQuantity.module.css";

export default function Cart() {

  const { cart, deleteFromCart, subtractCartQuantity, addCartQuantity } =
    useCartContext();

  const navigate = useNavigate();

  switch (true) {
    case cart.userCart.length == 0:
      return (
        <>
          <div className="container empty_cart">
            <h3>Non hai ancora aggiunto prodotti al carrello</h3>
            <p className="fs-2">
              <i class="bi bi-emoji-frown-fill"></i>
            </p>

            <button onClick={() => navigate("/")} className="btn btn-dark mt-4">
              <i class="bi bi-arrow-left-short"></i> Torna alla Home
            </button>
          </div>
        </>
      );
    case cart.userCart.length > 0:
      return (
        <>
          <div className="container my-5">
            <table
              class={`${styles.table_mobile} ${styles.table_border} table mt-3`}
            >
              <thead>
                <tr>
                  <th
                    className={styles.table_header}
                    scope="col"
                    style={{ width: "15%" }}
                  >
                    Immagine prodotto
                  </th>
                  <th className={styles.table_header} scope="col">
                    Nome prodotto
                  </th>
                  <th className={styles.table_header} scope="col">
                    Promozioni
                  </th>
                  <th className={styles.table_header} scope="col">
                    Quantità
                  </th>
                  <th className={styles.table_header} scope="col">
                    Prezzo*
                  </th>
                  <th className={styles.table_header} scope="col">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.userCart.map((item) => (
                  <>
                    <tr>
                      <td
                        className={`${styles.td_img_container} ${styles.desktop}`}
                      >
                        <div className={`cart_img_container ${styles.desktop}`}>
                          <img
                            onClick={() => navigate(`/${item.slug}`)}
                            className="cart_img"
                            src={`http://localhost:3000/${item.images[0].image}`}
                            alt={item.name}
                          />
                        </div>
                      </td>{" "}
                      <td
                        className={`${styles.table_body} ${styles.mobile_name} ${styles.desktop}`}
                      >
                        {item.name}
                      </td>
                      {/* MOBILE */}
                      <div className={styles.mobile_header_row}>
                        <td className={styles.td_img_container}>
                          <div className="cart_img_container">
                            <img
                              onClick={() => navigate(`/${item.slug}`)}
                              className="cart_img"
                              src={`http://localhost:3000/${item.images[0].image}`}
                              alt={item.name}
                            />
                          </div>
                        </td>
                        <td
                          className={`${styles.table_body} ${styles.mobile_name}`}
                        >
                          {item.name}
                        </td>
                      </div>
                      {/* END MOBILE */}
                      <td className={`${styles.table_body} ${styles.td_promo}`}>
                        {item.promotion.length > 0 ? (
                          <>
                            <span>{item.promotion[0].name}: </span>
                            <span>{item.promotion[0].discount}%</span>
                          </>
                        ) : (
                          <>Nessuna promozione trovata</>
                        )}
                      </td>
                      <td className={`${styles.table_body} ${styles.desktop}`}>
                        <button
                          onClick={() => subtractCartQuantity(item)}
                          className={btnStyles.btn_quantity}
                        >
                          -
                        </button>
                        <div className={btnStyles.btn_item}>
                          <span className="fs-5">X{item.cartQuantity}</span>
                        </div>
                        <button
                          onClick={() =>
                            addCartQuantity(
                              item,
                              item.cartQuantity + item.quantity
                            )
                          }
                          className={btnStyles.btn_quantity}
                        >
                          +
                        </button>
                        {/* <p className={styles.add_message}>{cart.message}</p> */}
                      </td>
                      <td className={`${styles.table_body} ${styles.desktop}`}>
                        {item.promotion.length > 0 ? (
                          <>
                            <label>
                              <span className="price_label_card text-success">
                                {(
                                  (item.price * item.promotion[0].discount) /
                                  100
                                ).toFixed(2)}{" "}
                                €
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
                      {/* MOBILE */}
                      <div className={styles.mobile_header_row}>
                        <td className={styles.table_body}>
                          <button
                            onClick={() => subtractCartQuantity(item)}
                            className={btnStyles.btn_quantity}
                          >
                            -
                          </button>
                          <div className={btnStyles.btn_item}>
                            <span className="fs-5">X{item.cartQuantity}</span>

                          </div>

                          <button
                            onClick={() =>
                              addCartQuantity(
                                item,
                                item.cartQuantity + item.quantity
                              )
                            }
                            className={btnStyles.btn_quantity}
                          >
                            +
                          </button>
                          {/* <p className={styles.add_message}>{cart.message}</p> */}
                        </td>
                        <td
                          className={`${styles.table_body} ${styles.price_tag}`}
                        >
                          {item.promotion.length > 0 ? (
                            <>
                              <label>
                                <span className="price_label_card text-success">
                                  {(
                                    (item.price * item.promotion[0].discount) /
                                    100
                                  ).toFixed(2)}{" "}
                                  €
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
                      </div>
                      {/* END MOBILE */}
                      <td className={`${styles.vertical_align} text-center`}>
                        <button
                          onClick={() => deleteFromCart(item)}
                          className={`${styles.btn_delete} btn mx-2 `}
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                        <button
                          onClick={() => navigate(`/${item.slug}`)}
                          className={`${styles.btn_watch} btn `}
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className={`${styles.total_price} total`}>
              <h5>TOTALE: </h5>
              <h4 className={styles.price}>
                {(cart.amount + cart.shipping).toFixed(2)}€
              </h4>
              <h6>Spedizione: </h6>
              <p>
                {cart.shipping === 0 ? <>Gratuita!</> : <>{cart.shipping}€</>}
              </p>
            </div>
            <div className={styles.payment}>
              <button
                onClick={() => navigate(`/checkout`)}
                class={`${styles.btn_payment} btn fs-3 my-2 my-sm-0`}
                type="submit"
              >
                Procedi al pagamento
              </button>
            </div>
          </div>
        </>
      );
  }
}
