import styles from "../../assets/css_modules/GridList.module.css";
import ProductImages from "../smart/ProductImages";
import { useNavigate } from "react-router-dom";

export default function ListLayout({ products }) {
  const navigate = useNavigate();

  if (!products || !products.results) {
    return (
      <div className="container">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ul className="list-unstyled">
        {products.results.map((item, i) => (
          <li
            key={item.slug}
            onClick={() => navigate(`/${item.slug}`)}
            className={styles.list_container}
          >
            <div className={styles.list_item_content}>
              <div className={styles.item_image}>
                <ProductImages images={item.images} index={i} />
              </div>

              <div className={styles.item_details}>
                <div className="flex-grow-1">
                  <h3 className={styles.item_title}>{item.name}</h3>
                  <p className={styles.item_description}>{item.description}</p>
                </div>

                <div className={styles.price_container}>
                  {item.promotions.length > 0 ? (
                    <>
                      <div
                        className={`${styles.text_promo_list} fw-bold text-promo mb-1`}
                      >
                        {item.promotions[0].name}
                      </div>
                      <span
                        className={`${styles.text_old_price_list} fs-6 text-old-price d-block`}
                      >
                        <del>{item.price}€</del>
                      </span>
                      <span className="price_label_card text-price fs-5">
                        {(
                          (item.price * item.promotions[0].discount) /
                          100
                        ).toFixed(2)}
                        €
                      </span>
                    </>
                  ) : (
                    <span className="price_label_card text-price fs-5">
                      {item.price}€
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
