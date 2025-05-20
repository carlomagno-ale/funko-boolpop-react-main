import CardUi from "../dumb/Card.ui";

export default function List({ products }) {
  return (
    <>
      <div className="page_counter w-100 row">
        <div className="col-8">

        </div>
        <div className="col-4 d-flex gap-3 align-items-center justify-content-end">
          <span className="sm-font">
            Pagina: {products.currentPage} / {products.totalPages}
          </span>
        </div>
      </div>
      <div className="home_p_list row row-cols-1 row-cols-md-2 row-cols-lg-4 align-items-center flex-nowrap">
        {products.results.map((product) => (
          <CardUi
            key={`unique${product.slug}`}
            images={product.images}
            name={product.name}
            price={Number(product.price)}
            license={product.license}
            promotions={product.promotions}
            slug={product.slug}
            quantity={product.quantity}
          />
        ))}

      </div>
    </>
  );
}

