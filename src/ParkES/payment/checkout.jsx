import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import useOrderStore from "../../knh/Store/useOrderStore.jsx";   // 주문 상품 상태
import useAddrStore from "../../knh/Store/useAddrStore.jsx";     // 주소 상태
import useAuthStore from "../../knh/Store/UserAuthStore.js";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
    // 주문 상품 상태
    const orderedItems = useOrderStore(state => state.orderedItems);

    // 배송지 주소 상태
    const address = useAddrStore(state => state.address);

    // 로그인 유저 정보
    const user = useAuthStore(state => state.user);

    const [widgets, setWidgets] = useState(null);
    const [order, setOrder] = useState(null);
    const [ready, setReady] = useState(false);
    const [paymentRequested, setPaymentRequested] = useState(false);

    useEffect(() => {
        async function initWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgetsInstance = tossPayments.widgets({ customerKey: ANONYMOUS });
            setWidgets(widgetsInstance);
        }
        initWidgets();
    }, []);

    useEffect(() => {
        async function renderWidgets() {
            if (!widgets || !order) return;

            await widgets.setAmount({
                currency: "KRW",
                value: order.totalPayAmount,
            });

            await Promise.all([
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);

            setReady(true);
        }
        renderWidgets();
    }, [widgets, order]);

    useEffect(() => {
        async function requestPayment() {
            if (!ready || !paymentRequested || !widgets || !order) return;

            try {
                await widgets.requestPayment({
                    orderId: order?.orderId?.toString() ?? "",
                    orderName: "주문 상품",
                    customerName: order.receiverName,
                    customerEmail: "customer123@gmail.com",
                    successUrl: window.location.origin + "/sandbox/success",
                    failUrl: window.location.origin + "/sandbox/fail",
                });
            } catch (error) {
                alert(error.message);
            } finally {
                setPaymentRequested(false);
            }
        }
        requestPayment();
    }, [ready, paymentRequested, widgets, order]);

    const orderRequestDto = {
        receiverName: address.name,
        receiverPhone: `${address.phone1}-${address.phone2}-${address.phone3}`,
        zipCode: address.postcode,
        address1: address.address1,
        address2: address.address2,
        deliveryMessage: address.message,
        items: orderedItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            selectedSize: item.selectedSize ?? "",
        })),
    };


    const handleOrderAndPayment = async () => {
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!address || !orderedItems || orderedItems.length === 0) {
            alert("배송지 또는 주문 항목 정보가 누락되었습니다.");
            return;
        }

        try {
            console.log("보내는 주문 DTO:", JSON.stringify(orderRequestDto, null, 2));

            const res = await fetch(`http://localhost:8080/api/orders/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderRequestDto),
                credentials: "include",
            });

            if (!res.ok) throw new Error("주문 생성 실패");

            const orderData = await res.json();
            setOrder(orderData);
            setPaymentRequested(true);
            setReady(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100" />
                <div id="agreement" className="w-100" />
                <div className="btn-wrapper w-100">
                    <button
                        className="w-full bg-[#1B3C5C] text-white py-3 mt-6 text-lg rounded mobile:text-base"
                        onClick={handleOrderAndPayment}
                        disabled={!ready && !!order}
                    >
                        주문 및 결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
