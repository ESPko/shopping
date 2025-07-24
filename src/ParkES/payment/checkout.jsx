import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
    const [widgets, setWidgets] = useState(null);
    const [order, setOrder] = useState(null);
    const [ready, setReady] = useState(false);
    const [paymentRequested, setPaymentRequested] = useState(false); // 결제 요청 시그널

    const orderRequestDto = {
        receiverName: "김토스",
        receiverPhone: "010-1234-5678",
        zipCode: "12345",
        address1: "서울시 강남구 역삼동",
        address2: "빌딩 101호",
        deliveryMessage: "부재 시 전화주세요",
    };

    useEffect(() => {
        async function initWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgetsInstance = tossPayments.widgets({ customerKey: ANONYMOUS });
            setWidgets(widgetsInstance);
        }
        initWidgets();
    }, []);

    // order 상태가 바뀌면 위젯 렌더링 + 금액 세팅 후 ready=true
    useEffect(() => {
        async function renderWidgets() {
            if (!widgets || !order) return;

            await widgets.setAmount({
                currency: "KRW",
                value: order.totalPayAmount,
            });

            await Promise.all([
                widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
                widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
            ]);

            setReady(true);
        }
        renderWidgets();
    }, [widgets, order]);

    // ready 상태가 true이고 결제 요청 플래그가 세워졌을 때 결제 요청 실행
    useEffect(() => {
        async function requestPayment() {
            if (!ready || !paymentRequested || !widgets || !order) return;

            try {
                await widgets.requestPayment({
                    orderId: order.id.toString(),
                    orderName: "토스 티셔츠 외 2건",
                    customerName: order.receiverName,
                    customerEmail: "customer123@gmail.com",
                    successUrl: window.location.origin + "/sandbox/success",
                    failUrl: window.location.origin + "/sandbox/fail",
                });
            } catch (error) {
                alert(error.message);
            } finally {
                setPaymentRequested(false); // 요청 플래그 초기화
            }
        }
        requestPayment();
    }, [ready, paymentRequested, widgets, order]);

    const handleOrderAndPayment = async () => {
        try {
            const res = await fetch("/api/orders/1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderRequestDto),
                credentials: "include",
            });

            if (!res.ok) throw new Error("주문 생성 실패");

            const orderData = await res.json();
            setOrder(orderData);         // order 상태 업데이트 → 위젯 렌더링 트리거
            setPaymentRequested(true);   // 결제 요청 플래그 세우기
            setReady(false);             // 다시 렌더링 상태로 리셋
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
