import OrderPage from "../ Order/OrderPage.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import { CircleCheck } from 'lucide-react';
import OrderItem from "../../components/OrderItem.jsx";
import useOrderStore from "../../Store/useOrderStore.jsx";
import {useEffect} from "react";
import OrderSummary from "../../components/OrderSummary.jsx";
import OrderAddr from "../../components/OrderAddr.jsx";
import {useNavigate} from "react-router-dom";


const OrderCompletePage = () => {
    const { orderAll } = useOrderStore();
    const nav = useNavigate();
    const goHome = () => {
        nav("/main"); // 메인 페이지로 이동
    };


    useEffect(() => {
        orderAll(); // ✅ 이걸 꼭 호출해야 orderedItems에 데이터가 들어감
    }, []);
    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto">
                <h2 className={'flex justify-center text-3xl font-bold pb-2'}><CircleCheck size={38} className={'pb-1 mr-1'} color={'#008832'} />결제완료!</h2>
                <p className={'flex justify-center'}>감사합니다 결제가 완료되었습니다.</p>
                <OrderItem />
                <OrderSummary showSavings={false} />
                <OrderAddr readOnly={true} />
                <button
                    className="w-full bg-[#1B3C5C] text-white py-3 mt-6 text-lg rounded"
                    onClick={() => goHome()}
                >
                    쇼핑 계속하기
                </button>
            </section>
            <Footer />
        </>
    )
}
export default OrderCompletePage;