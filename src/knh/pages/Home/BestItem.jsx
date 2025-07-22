import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import {useState} from "react";

import 'swiper/css';
import 'swiper/css/scrollbar';

const BestItem = ({mainContentTit}) => {
    const [activeId, setActiveId] = useState(1);
    const bestItem = [
        {
            id: 1, // Shoes
            items: [
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/552dda5c0460010965cccbda91f2b7fc.jpg',
                    name: '발레토 SILVER',
                    price: 99000,
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '발레토 IVORY',
                    price: 99000,
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '벨루나 SILVER',
                    price: 149000,
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '아비오 WHITE/GREEN',
                    price: 109000,
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/552dda5c0460010965cccbda91f2b7fc.jpg',
                    name: '포사 슬라이드 BLACK',
                    price: 37800,
                    link: ''

                }
            ]
        },
        {
            id: 2, // Clothing
            items: [
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/d7c868224c895ef159f63a6d21316809.jpg',
                    name: '티셔츠 WHITE',
                    price: 49000,
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/d7c868224c895ef159f63a6d21316809.jpg',
                    name: '셔츠 BLUE',
                    price: 69000,
                    link: ''
                }
            ]
        },
        {
            id: 3, // Acc.
            items: [
                {
                    image: 'https://www.diadorakorea.com/web/product/small/202505/5a798fa50db9f2a1c68cd9842f3dfcf7.jpg',
                    name: '가방 BLACK',
                    price: 39000,
                    link: ''
                }
            ]
        },
        {
            id: 4, // Sports
            items: [
                {
                    image: 'https://www.diadorakorea.com/web/product/small/202505/2c2857994790b96787fd3fdeea88ae80.jpg',
                    name: '스포츠 셔츠',
                    price: 59000,
                    link: 'https://www.diadorakorea.com/'
                }
            ]
        }
    ];
    const itemCate = [
        {
            id: 1,
            title: 'Shoes',
        },
        {
            id: 2,
            title: 'Clothing',
        },
        {
            id: 3,
            title: 'Acc.',
        },
        {
            id: 4,
            title: 'Sports',
        },

    ]
    const activeCategory = bestItem.find((cat) => cat.id === activeId);
    const selectItems = activeCategory ? activeCategory.items : [];
    return (
        <section className={'main-best pt-40 mobile:pt-10'}>
            <div className={'flex justify-between items-center px-3 mobile:block'}>
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 1);
                        return item ? (
                            <div key={item.id}>
                                <h1 className={'text-4xl font-[700] mobile:text-2xl'}>{item.title}</h1>
                                <p className={'text-lg font-thin mobile:text-base'}>{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>
                <div>
                    {itemCate.map((cate) => (
                        <button
                        key={cate.id}
                        onClick={() => setActiveId(cate.id)}
                        className={`border px-10 py-2 rounded-full font-bold transition ml-4 mobile:text-sm mobile:ml-1 mobile:px-5 mobile:py-2
            ${activeId === cate.id ? 'bg-[#1B3C5C] text-white' : 'bg-white text-[#1B3C5C] border-[#1B3C5C]'}
          `}
                        >{cate.title}
                        </button>
                    ))}
                </div>
            </div>

        {/* 상품 슬라이드 */}
            <div className="relative"> {/* 감싸는 div로 위치 조정 */}
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={5}
                    slidesPerView={4.3}
                    loop={true}
                    autoplay={{ delay: 4000 }}
                    pagination={{
                        type: 'progressbar',
                        clickable: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.3 },
                        1280: { slidesPerView: 4.3 },
                    }}
                >
                    {selectItems.map((item, id) => (
                        <SwiperSlide key={id}>
                            <div className="p-4 text-left">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-w-full mb-4 w-full object-cover rounded-lg "
                                    />
                                </a>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="font-bold">{item.price.toLocaleString()}원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
export default BestItem;