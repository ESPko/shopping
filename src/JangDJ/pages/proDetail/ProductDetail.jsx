import Header from "../../../knh/components/Header.jsx";
import ProDeImage from "../../component/preDetail/ProDeImage.jsx";
import ProDeBuy from "../../component/preDetail/ProDeBuy.jsx";
import ProDeTap from "../../component/preDetail/ProDeTap.jsx";
import ProDeInfo from "../../component/preDetail/ProDeInfo.jsx";
import TopButton from "../../component/TopButton.jsx";
import Footer from "../../Footer.jsx";

function ProductDetail() {
    const price = 139000;
    const name = "쿨웨이브 후드 반팔 아노락 GREEN";

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div className="pt-28 max-w-[1440px] mx-auto overflow-visible">
                <div className="grid md:grid-cols-2 gap-10 pt-4 px-24">
                    <ProDeImage />
                    <ProDeBuy name={name} price={price} />
                </div>

                <ProDeTap />
                <ProDeInfo />
            </div>
            <TopButton />
        </div>
    );
}

export default ProductDetail