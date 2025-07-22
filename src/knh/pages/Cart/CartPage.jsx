import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import CartItem from "../../components/CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import { useEffect } from "react";
import useAuthStore from "../../Store/UserAuthStore.js";
import useCartStore from "../../Store/UseCartStore.jsx";

const CartPage = () => {
    const { cartItems, fetchCartItems } = useCartStore();
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        if (user?.id) {
            const loadCart = async () => {
                await fetchCartItems();
            };
            loadCart();
        }
    }, [user]); // user.id 변경시에만 호출

    // cartItems가 변경될 때마다 로그 출력
    useEffect(() => {
        console.log("cartItems updated:", cartItems);
    }, [cartItems]);

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto">
                <h2 className="flex justify-center text-3xl font-bold">장바구니</h2>

                {cartItems.length === 0 ? (
                    <p className="text-center mt-10">장바구니가 비어 있습니다.</p>
                ) : (
                    cartItems.map(item => (
                        <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
                    ))
                )}

                {cartItems.length > 0 && <CartSummary />}
            </section>
            <Footer />
        </>
    );
};

export default CartPage;
