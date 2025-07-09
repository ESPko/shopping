import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import CartItem from "../../components/CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import useCartStore from "../../Store/useCartStore.jsx";

const CartPage = () => {
    const { cartItems } = useCartStore();

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto">
                <h2 className={'flex justify-center text-3xl font-bold'}>장바구니</h2>
                <CartItem/>
                {cartItems.length > 0 && <CartSummary />}
            </section>
            <Footer />
        </>
    )
}
export default CartPage;