import OrderItem from "../../components/OrderItem.jsx";
import useOrderStore from "../../Store/useOrderStore.jsx";


const OrderList = () => {
    const {shippingFee, totalPayAmount, totalOrderPrice} = useOrderStore();
    return (
        <>
            <h3 className={'border-b pb-1 border-b-black'}>주문상품</h3>
            <OrderItem/>
            <div className={'font-thin text-sm py-2 text-right'}>
                상품 구매 금액 <span>{totalOrderPrice().toLocaleString()}원 </span> + 배송비<span>{shippingFee()}</span> =
                합계 <span> {totalPayAmount().toLocaleString()}원</span>
            </div>

        </>
    )
}
export default OrderList;