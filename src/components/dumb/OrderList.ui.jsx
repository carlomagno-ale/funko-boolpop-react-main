import Loader from "./Loader.ui";

export default function OrderListUi({ orderList }) {

    console.log(orderList);


    if (orderList.data.state == 'success' && orderList.data.length == 0) {
        return (
            <>
                <h2>No orders found</h2>
            </>
        )
    }

    switch (orderList.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'success':
            return (
                <>
                    <ul className="list-unstyled w-100 order_bg">
                        {orderList.data.map(item => (
                            <>
                                <li className="order">
                                    <div className="order_col  order_img" style={{ width: "25%" }}>
                                        <img className="w-100" src={`http://localhost:3000/${item.images[0].image}`} alt="" />
                                    </div>
                                    <div className="order_col">{item.name}</div>
                                    <div className="order_col">X{item.cartQuantity}</div>
                                    <div className="order_col">
                                        {
                                            item.promotion.length > 0 ?
                                                (
                                                    <>
                                                        <label>
                                                            <div className="fw-bold text-danger price">{item.promotion[0].name}</div>
                                                            <span className="text-secondary price_original">
                                                                <del>{item.price}€</del>
                                                            </span>
                                                            <span className="price_label_card text-dark price_discount">
                                                                {
                                                                    (item.price * item.promotion[0].discount / 100).toFixed(2)
                                                                }€
                                                            </span>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="price_label_card">
                                                            {item.price}€
                                                        </label>
                                                    </>
                                                )
                                        }
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </>
            )
    }
}