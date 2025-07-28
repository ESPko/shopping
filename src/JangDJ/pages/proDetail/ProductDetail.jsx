import Header from "../../../knh/components/Header.jsx";
import ProDeImage from "../../component/preDetail/ProDeImage.jsx";
import ProDeBuy from "../../component/preDetail/ProDeBuy.jsx";
import ProDeTap from "../../component/preDetail/ProDeTap.jsx";
import ProDeInfo from "../../component/preDetail/ProDeInfo.jsx";
import TopButton from "../../component/TopButton.jsx";
import Footer from "../../Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error('Error fetching product:', err);  // 에러 로그 추가
            });
    }, [id]);

    if (!product) return <div>로딩중...</div>;

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div className="pt-28 max-w-[1440px] mx-auto overflow-visible">
                <div className="grid md:grid-cols-2 gap-10 pt-4 px-24 mobile:block mobile:px-4">
                    <ProDeImage product={product} />
                    <ProDeBuy
                        productId={product.id}
                        name={product.name}
                        price={product.price}
                    />
                </div>

                <ProDeTap product={product} />
                <ProDeInfo product={product} />
            </div>
            <TopButton />
            <Footer />
        </div>
    );
}

export default ProductDetail;
