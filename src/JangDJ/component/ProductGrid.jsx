import ProductCard from "./ProductCard.jsx";

function ProductGrid({products}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-4">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              salePrice={item.salePrice}
              />
          ))}
        </div>
    );
}

export default ProductGrid