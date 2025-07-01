const HighItem = ({ mainContentTit }) => {
    const highItemData = {
        moreLink: 'https://www.diadorakorea.com/',
        items: [
            {
                id: 1,
                img: 'https://www.diadorakorea.com/web/product/medium/202505/162487e48590dd917e809e2bf594c743.jpg',
                name: '그랜드슬램 에어리 하프 반팔 아노락 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 2,
                img: 'https://www.diadorakorea.com/web/product/medium/202503/f4ab6f4d8173e675e4ce07b37c71a0c5.jpg',
                name: '그랜드슬램 에어리 쇼츠 GREEN',
                price: 3000,
                link: '',
            },
            {
                id: 3,
                img: 'https://www.diadorakorea.com/web/product/small/202504/0cc654610b0fd8feba88a88b033ce6c4.jpg',
                name: '그랜드슬램 에어리 하프 반팔 아노락 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 4,
                img: 'https://www.diadorakorea.com/web/product/medium/202501/81e4016b6883536121c8203d961bc6c2.jpg',
                name: '그랜드슬램 에어리 하프 반팔 아노락 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 5,
                img: 'https://www.diadorakorea.com/web/product/medium/202503/f4ab6f4d8173e675e4ce07b37c71a0c5.jpg',
                name: '그랜드슬램 에어리 하프 반팔 아노락 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 6,
                img: 'https://www.diadorakorea.com/web/product/medium/202505/162487e48590dd917e809e2bf594c743.jpg',
                name: '시어서커 반팔 피스테 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 7,
                img: 'https://www.diadorakorea.com/web/product/small/202504/b49aa0d3f23f0d93b385b7e1122b0f06.jpg',
                name: '시어서커 반팔 피스테 OFF WHITE',
                price: 3000,
                link: '',
            },
            {
                id: 8,
                img: 'https://www.diadorakorea.com/web/product/small/202504/0cc654610b0fd8feba88a88b033ce6c4.jpg',
                name: '시어서커 반팔 피스테 OFF WHITE',
                price: 3000,
                link: '',
            },
        ],
    };

    return (
        <section className="main-high px-3 py-40">
            <div className="flex justify-between items-center">
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 2);
                        return item ? (
                            <div key={item.id}>
                                <h1 className="text-4xl font-[700]">{item.title}</h1>
                                <p className="text-lg font-thin">{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>
                <a
                    href={highItemData.moreLink}
                    className="border px-10 py-2 rounded-full font-bold text-white bg-[#1B3C5C]"
                >
                    더보기
                </a>
            </div>

            {/* 상품 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {highItemData.items.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        className="bg-[#f7f7f7] rounded-lg overflow-hidden transition text-centers"
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-lg font-thin">
                                {item.price.toLocaleString()}원
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default HighItem;