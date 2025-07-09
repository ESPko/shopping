const MediumBanner = () => {

    // 배너, 상품 데이터
    const mediumBanner = {
        background: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/8e6099545c006d37b2fdddaa6eea4c72.jpg', // 배너 배경 이미지
        link: 'https://diadorakorea.com', // 배너 전체 클릭 링크
        title:'더 멋진 게임을 위한 스타일링',
        subtitle:'역동적인 퍼포먼스를 지원하는 우먼스 테니스웨어',
        products: [
            {
                id: 1,
                img: 'https://www.diadorakorea.com/web/product/medium/202505/5a0271ed95f09c777f1feaaba1c5a612.jpg',
                name: '테니스 플리츠 스커트 GREEN',
                price: 99000,
                link: '',
            },
            {
                id: 2,
                img: 'https://www.diadorakorea.com/web/product/medium/202505/d5478bb5586579ebcd50b23f131b964d.jpg',
                name: '테니스 플리츠 슬리브리스 우먼 BEIGE',
                price: 89000,
                link: '',
            },
            {
                id: 3,
                img: 'https://www.diadorakorea.com/web/product/small/202503/7e5aefbc62cd6973f2e1bb215daf6346.jpg',
                name: '테니스 플리츠 스커트 GREEN',
                price: 79000,
                link: '',
            },
            {
                id: 4,
                img: 'https://www.diadorakorea.com/web/product/small/202503/2acbe6bdfc3e053dc720211df3610b5c.jpg',
                name: '테니스 플리츠 스커트 GREEN',
                price: 69000,
                link: '',
            },
        ]
    };
    return (
        <section
            className="flex flex-row h-full py-10 mt-40"
            style={{
                backgroundImage: `url(${mediumBanner.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <div className={'w-5/6'}></div>
            <div className={'ml-auto mr-10 max-w-[820px]'}>
                <div className={'p-6 rounded-lg overflow-hidden'}>
                    <h1 className={'text-white text-4xl font-bold pb-2'}>{mediumBanner.title}</h1>
                    <p className={'text-white text-2xl'}>{mediumBanner.subtitle}</p>
                </div>
                <div className="flex gap-6 w-full p-6 rounded-lg overflow-hidden">
                    {mediumBanner.products.map((product) => (
                        <a key={product.id} href={product.link} className="text-center">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="  rounded-lg mb-2"
                            />
                            <div className={'text-left'}>
                                <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                                <p className="text-sm text-white">{product.price.toLocaleString()}원</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </section>
    )
}
export default MediumBanner;
