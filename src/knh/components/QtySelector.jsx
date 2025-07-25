const QtySelector = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center bg-gray-100 px-4 py-1 text-center w-20">
            <button onClick={onDecrease}>-</button>
            <span className="px-3 text-sm">{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </div>
    );
};

export default QtySelector;