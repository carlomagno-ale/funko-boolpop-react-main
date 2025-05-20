import CardUi from "./Card.ui";
export default function GridLayout({ products }) {
  if (!products || !products.results) {
    return (
      <div className="container">
        <p>No products available</p>
      </div>
    );
  }
  return (
    <div className="container mt-5 mb-5">
      <div className=" w-100 m-auto row row-cols- row-cols-md-3 row-cols-lg-4 gy-4 align-items-center">
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
    </div>
  );
}
