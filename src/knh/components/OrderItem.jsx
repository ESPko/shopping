import useOrderStore from "../Store/useOrderStore.jsx";

const OrderItem = () => {
    const { orderedItems,  itemTotalPrice } = useOrderStore();


    return (
        <div className={'mt-5 mb-3 '}>
            <h3 className={'border-b pb-1 border-b-black'}>주문상품</h3>
            <div className={'mt-10 mb-3'}>
                {orderedItems.map((item) => (
                    <div
                        key={item.id}
                        className={'flex gap-10 items-center justify-between border-b border-b-gray-200 py-4 mobile:gap-2 mobile:py-3'}
                    >
                        <div className={'max-w-[120px] mobile:max-w-[80px]'}>

                            <img src={item.info_image} className={'w-full object-cover'} alt={item.name} />
                        </div>

                        <div className={'mr-32 mobile:mr-0 mobile:text-sm'}>
                            <h2 className={'font-bold'}>{item.name}</h2>
                            {item.selectedSize && (
                                <p className="text-sm text-gray-600">[옵션: {item.selectedSize}]</p>
                            )}
                            <p className="mt-2">{item.price.toLocaleString()}원</p>
                        </div>

                        <div className={'text-gray-700 mobile:text-sm mobile:pr-10'}>
                            X{item.quantity}
                        </div>

                        <div className={'mobile:text-sm  mobile:pr-3'}>
                            {itemTotalPrice(item).toLocaleString()}원
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default OrderItem;