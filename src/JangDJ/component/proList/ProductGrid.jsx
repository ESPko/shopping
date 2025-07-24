import ProductCard from "./ProductCard.jsx";
import ProductListCart from "../../pages/proList/ProductListCart.jsx";
import {useState} from "react";

function ProductGrid({ products }) {
    const [selectProduct, setSelectProduct] = useState(null);


    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-4">
                {products.map((item) => {
                    return (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.infoImage}
                            name={item.name}
                            price={item.price}
                            salePrice={item.sale_price}
                            onCartClick={setSelectProduct}
                        />
                    );
                })}
            </div>
            {selectProduct && (
                <ProductListCart product={selectProduct} onClose={() => setSelectProduct(null)} />
            )}
        </>
    );
}

export default ProductGrid;
