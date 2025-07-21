import { useEffect, useState } from "react";
import axios from "axios";

const MediumBanner = () => {
    const [products, setProducts] = useState([]);

    // 기존 하드코딩된 배너 정보
    const mediumBannerInfo = {
        background: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/8e6099545c006d37b2fdddaa6eea4c72.jpg',
        link: 'https://diadorakorea.com',
        title: '더 멋진 게임을 위한 스타일링',
        subtitle: '역동적인 퍼포먼스를 지원하는 우먼스 테니스웨어',
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/products/medium")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("medium 타입 상품 불러오기 실패:", err));
    }, []);

    return (
        <section
            className="flex flex-row h-full py-10 mt-40"
            style={{
                backgroundImage: `url(${mediumBannerInfo.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={'w-5/6'}></div>
            <div className={'ml-auto mr-10 max-w-[820px]'}>
                <div className={'p-6 rounded-lg overflow-hidden'}>
                    <h1 className={'text-white text-4xl font-bold pb-2'}>{mediumBannerInfo.title}</h1>
                    <p className={'text-white text-2xl'}>{mediumBannerInfo.subtitle}</p>
                </div>
                <div className="flex gap-6 w-full p-6 rounded-lg overflow-hidden">
                    {products.map((product) => (
                        <a
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="text-center"
                        >
                            <img
                                src={product.infoImage}
                                alt={product.name}
                                className="rounded-lg mb-2"
                            />
                            <div className={'text-left'}>
                                <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                                <p className="text-sm text-white">{product.price?.toLocaleString()}원</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MediumBanner;
