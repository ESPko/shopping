import useProDeInfo from "../../store/useProDeInfo.js";

function ProDeExpla() {
    const { images } = useProDeInfo();

    return (
        <div id="info" className="py-20 scroll-mt-28 max-w-5xl mx-auto px-4">
            <h3 className="text-4xl font-black mb-8 text-center">상품정보</h3>
            <div>
                {images.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`상품 이미지 ${idx + 1}`}
                        className="w-full rounded-lg shadow" />
                ))}
            </div>
        </div>
    );
}

export default ProDeExpla