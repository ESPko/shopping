import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import {CheckoutPage} from "../../../ParkES/payment/checkout.jsx";
import OrderList from "./OrderList.jsx";
import OrderAddr from "./OrderAddr.jsx";
import OrderSummary from "./OrderSummary.jsx";

const OrderPage = () =>  {
    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto">
                <h2 className={'flex justify-center text-3xl font-bold pb-4'}>주문하기</h2>
                <OrderList />
                <OrderAddr />
                <OrderSummary />
                <CheckoutPage />
            </section>
            <Footer />
        </>
    );
}
export default OrderPage;