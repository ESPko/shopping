import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import '/src/knh/knh.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MainBanner = () => {
    const mainBanner = [
        {
            id: 1,
            src: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/ee20695737bb681537520a37e299f573.jpg',
            link: 'https://www.diadorakorea.com/product/promotion.html?cate_no=425',
            title: 'STYLE IS ALWAYS IN THE GAME',
            subtitle: '2025 S/S 우먼스 테니스웨어',
        },
        {
            id: 2,
            src: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/ee9980d8f54a659e69fc9e4f9dc23181.jpg',
            link: 'https://www.diadorakorea.com/product/promotion.html?cate_no=408',
            title: 'Out of Home',
            subtitle: '어디든 떠나보세요, comfy와 함께.',
        },
        {
            id: 3,
            src: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/4371a77c2631eca5c7445ae7c5cd9b4b.jpg',
            link: 'https://www.diadorakorea.com/product/promotion.html?cate_no=432',
            title: 'SUMMER VIBE PANTS',
            subtitle: '액티비티의 경쾌함과 일상의 감각을 담은 디아도라의 여름팬츠',
        },
    ];

    return (
        <section className="main-banner relative">
            <Swiper
                className="relative pb-8 w-full"
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={{ type: 'progressbar' }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {mainBanner.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        {/* ✅ 클릭 무효화: onClick 제거됨 */}
                        <img
                            src={banner.src}
                            alt={banner.title}
                            className="max-w-full mx-full object-cover"
                        />
                        <div className="main-text absolute bottom-20 left-20">
                            <h1 className="main-title text-6xl text-white font-bold pb-4">
                                {banner.title}
                            </h1>
                            <p className="main-sub text-2xl text-white">{banner.subtitle}</p>
                            {/* 버튼은 비어있으니 삭제 가능, 남겨두려면 아래처럼 주석 처리하거나 스타일링 필요 */}
                            {/* <button onClick={() => window.location.href = banner.link}></button> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default MainBanner;
