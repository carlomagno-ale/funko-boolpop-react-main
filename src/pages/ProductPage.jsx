import styles from "../assets/css_modules/Product.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImages from "../components/smart/ProductImages";
import { useCartContext } from "../contexts/cartContext";
import CarouselUi from "../components/dumb/Carousel.ui";
import List from "../components/smart/List";
import Loader from "../components/dumb/Loader.ui";
import btnStyles from "../assets/css_modules/btnQuantity.module.css";

export default function ProductPage() {

    const { slug } = useParams();

    const { handleCart, cart, subtractCartQuantity, addCartQuantity } = useCartContext();

    const navigate = useNavigate();

    const [funko, setFunkos] = useState({
        state: "loading",
    });

    const [pageSlug, setPageSlug] = useState(slug)
    const [cartItem, setCartItem] = useState(null)
    const [pageDate, setPageDate] = useState(1); //definisce il numero della pagina visualizzata
    const [limit, setLimit] = useState(4); // definisce il numero di elementi ricevuti dal db
    const date = 1; //imposta l'ordinamento per data
    const [displayMsg, setDisplayMsg] = useState(false)

    const [suggested, setSuggested] = useState({
        state: 'laoding'
    })


    useEffect(() => {

        setPageSlug(slug)
    }, [slug])


    useEffect(() => {
        setDisplayMsg(true)
        const timer = setInterval(() => {
            setDisplayMsg(false)
        }, 3000)
        return () => clearInterval(timer)
    }, [cart])


    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setFunkos({
                    state: "success",
                    result: data,
                });
            })
            .catch((err) => {
                setFunkos({
                    state: "error",
                    message: err.message,
                });
            });
    }, [slug]);

    useEffect(() => {
        if (funko.state === 'success') {

            const foundItem = cart.userCart.find(item => item.slug === funko.result.slug);
            foundItem != undefined ? setCartItem(foundItem) : setCartItem(null)
        }
    }, [funko, cart])


    //fetch per suggested
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/recommended?slug=${pageSlug}&limit=${limit}&page=${pageDate}`)
            .then(res => res.json())
            .then(data => {

                setSuggested({
                    state: 'success',
                    results: data
                })
            })
            .catch(err => {
                setSuggested({
                    state: 'error',
                    message: err.message
                })
            })
    }, [pageSlug, pageDate])



    switch (funko.state) {
        case "loading":
            return (
                <>
                    <Loader />
                </>
            );
        case "error":
            return (
                <>
                    <h1>{funko.state}</h1>
                    <p>{funko.message}</p>
                </>
            );
        case "success":
            return (
                <>
                    <main>
                        <div className="container my-5 h-100">
                            <div className="row row-cols-1 row-cols-lg-2 ">
                                <div
                                    className=" col col-xs-12 col-sm-12 col-md-12 col-lg-6 "
                                    key={funko.result.slug}
                                >
                                    <div className="product_page_img rounded-5 overflow-hidden">
                                        <ProductImages images={funko.result.images} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{funko.result.license.toUpperCase()}</label>
                                    <h2 className="mb-2">{funko.result.name}</h2>
                                    <div className="price_section">
                                        <div>
                                            {funko.result.promotion.length > 0 ? (
                                                <>
                                                    <label>
                                                        <span className="text-secondary fs-5">
                                                            <del>{funko.result.price} €</del>
                                                        </span>
                                                        <span className={`${styles.price_label} mx-3`}>
                                                            {(
                                                                (funko.result.price *
                                                                    funko.result.promotion[0].discount) /
                                                                100
                                                            ).toFixed(2)}{" "}
                                                            €
                                                        </span>
                                                    </label>
                                                </>
                                            ) : (
                                                <>
                                                    <label className="price_label">
                                                        {funko.result.price} €
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        cartItem ? (<></>) : (
                                            <>
                                                <button
                                                    onClick={() => handleCart(funko.result, funko.result.quantity)}
                                                    className={`${styles.btn_add} btn btn_chart my-2 my-sm-0`}
                                                    type="submit"
                                                >
                                                    Aggiungi al carrello
                                                </button>
                                            </>
                                        )
                                    }
                                    <div className={btnStyles.btn_container}>
                                        {cartItem ? (
                                            <>
                                                <button className={btnStyles.btn_quantity} onClick={() => subtractCartQuantity(cartItem)}>-</button>
                                                <div className={btnStyles.btn_item}>
                                                    {cartItem.cartQuantity}
                                                </div>
                                                <button className={btnStyles.btn_quantity} onClick={() => addCartQuantity(cartItem, funko.result.quantity)}>+</button>
                                            </>
                                        ) : (<></>)}

                                    </div>
                                    {
                                        displayMsg ? (<><span className="mx-4">{cart.message}</span></>) : (<></>)
                                    }


                                    <span className="d-block pt-4">
                                        {" "}
                                        <i class="bi bi-box-fill"></i> Disponibilità: {cartItem != null ? cartItem.quantity : funko.result.quantity}
                                    </span>

                                    <div className="product_description">
                                        <h4>Descrizione:</h4>
                                        <p>{funko.result.description}</p>
                                    </div>
                                    <div
                                        className="accordion my-custom-accordion"
                                        id="accordionExample"
                                    >
                                        <div className="accordion-item ">
                                            <h2 className="accordion-header ">
                                                <button
                                                    className="accordion_button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Informazioni aggiuntive
                                                </button>
                                            </h2>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p>
                                                        <strong>Categoria: :</strong> {funko.result.category}
                                                    </p>
                                                    <p>
                                                        <strong>Licenza: </strong>
                                                        {funko.result.license}
                                                    </p>
                                                    <div>
                                                        <strong>Attributi Speciali:</strong>
                                                        <ul className="list-unstyled">
                                                            {funko.result.attributes.map((item) => (
                                                                <>
                                                                    <li className="mx-4">
                                                                        - <strong>{item.name.toUpperCase()}</strong>
                                                                    </li>
                                                                </>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {suggested.state === 'success' ? (
                                <>
                                    <div className="carousel_productpage mb-5">
                                        <h1 className="fs-3">Guarda anche...</h1>
                                        <CarouselUi dataLength={suggested.results.totalPages} page={pageDate} setPage={setPageDate} content={(
                                            <>
                                                <List products={suggested.results} queryName={'date'} page={pageDate} query={date} />

                                            </>
                                        )} />
                                    </div>

                                </>
                            ) : (
                                <>
                                    <Loader />
                                </>
                            )}

                        </div>
                    </main>
                </>
            );
    }
}
