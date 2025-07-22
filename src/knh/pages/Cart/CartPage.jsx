import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import CartItem from "../../components/CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import useCartStore from "../../Store/useCartStore.jsx";
import {useEffect} from "react";

const CartPage = () => {
    const { cartItems, fetchCartItems } = useCartStore();
    const userId = 1; // 예시 - 로그인한 사용자 ID를 넣어주세요

    useEffect(() => {
        fetchCartItems(userId);
    }, [fetchCartItems, userId]);

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto  mobile:px-4">
                <h2 className={'flex justify-center text-3xl font-bold'}>장바구니</h2>
                <CartItem/>
                {cartItems.length > 0 && <CartSummary />}
            </section>
            <Footer />
        </>
    )
}
export default CartPage;