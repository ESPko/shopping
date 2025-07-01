import { Range } from 'react-range';

const MIN = 10000;
const MAX = 500000;
const STEP = 1000;

function FilterPriceSlide({ values, onChange }) {
    // const [values, setValues] = useState([MIN, MAX]);

    return (
        <div className="mb-6 border-b-2">
            <h3 className="font-semibold mb-4">가격</h3>
            <div className="px-4 pb-4">
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={onChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="h-2 bg-gray-200 rounded-full relative"
                            style={{ ...props.style }}
                        >
                            <div
                                className="absolute h-2 bg-[#00883F] rounded-full"
                                style={{
                                    left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                                    width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                                }}
                            />
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            className="h-5 w-5 bg-white border-4 border-[#00883F] rounded-full shadow-md flex items-center justify-center"
                        />
                    )}
                />

                <div className="flex justify-between text-sm mt-4 text-[#00883F]">
                    <span>{values[0].toLocaleString()}원</span>
                    <span>{values[1].toLocaleString()}원</span>
                </div>
            </div>
        </div>
    );
}

export default FilterPriceSlide