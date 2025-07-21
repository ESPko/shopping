import ProductCard from "./ProductCard.jsx";
import { useState } from "react";
import ProductListCart from "../../pages/proList/ProductListCart.jsx";

function ProductGrid({ products }) {
    const [selectProduct, setSelectProduct] = useState(null);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-4">
                {products.map((item) => (
                    <ProductCard
                        key={item.id}          // index 대신 고유 id 사용
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        salePrice={item.salePrice}
                        onCartClick={setSelectProduct}
                    />
                ))}
            </div>
            {selectProduct && (
                <ProductListCart product={selectProduct} onClose={() => setSelectProduct(null)} />
            )}
        </>
    );
}

export default ProductGrid;
