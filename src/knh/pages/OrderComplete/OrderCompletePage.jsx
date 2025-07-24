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
        orderAll();
    }, []);
    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto mobile:px-4 mobile:py-10">
                <h2 className={'flex justify-center text-3xl font-bold pb-2 mobile:text-xl mobile:pb-0'}><CircleCheck size={38} className={'pb-1 mr-1 mobile:size-8'} color={'#008832'} />결제완료!</h2>
                <p className={'flex justify-center mobile:text-sm'}>감사합니다 결제가 완료되었습니다.</p>
                <OrderItem />
                <OrderSummary showSavings={false} />
                <OrderAddr readOnly={true} />
                <button
                    className="w-full bg-[#1B3C5C] text-white py-3 mt-6 text-lg rounded mobile:text-sm"
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