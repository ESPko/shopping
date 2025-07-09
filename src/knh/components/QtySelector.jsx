const QtySelector = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center bg-gray-100 px-3 py-1 ">
            <button onClick={onDecrease}>-</button>
            <span className="px-3 text-sm">{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </div>
    );
};

export default QtySelector;