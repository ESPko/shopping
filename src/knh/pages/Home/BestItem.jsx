import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation, Scrollbar} from 'swiper/modules';
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
                    price: '99,000원',
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '발레토 IVORY',
                    price: '99,000원',
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '벨루나 SILVER',
                    price: '149,000원',
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/7369bc23020e2ca364635df33ff8028f.jpg',
                    name: '아비오 WHITE/GREEN',
                    price: '109,000원',
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/552dda5c0460010965cccbda91f2b7fc.jpg',
                    name: '포사 슬라이드 BLACK',
                    price: '37,800원',
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
                    price: '49,000원',
                    link: ''
                },
                {
                    image: 'https://www.diadorakorea.com/web/product/medium/202505/d7c868224c895ef159f63a6d21316809.jpg',
                    name: '셔츠 BLUE',
                    price: '69,000원',
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
                    price: '39,000원',
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
                    price: '59,000원',
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
        <section className={'main-best pt-40'}>
            <div className={'flex justify-between items-center px-3'}>
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 1);
                        return item ? (
                            <div key={item.id}>
                                <h1 className={'text-4xl font-[700]'}>{item.title}</h1>
                                <p className={'text-lg font-thin'}>{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>
                <div>
                    {itemCate.map((cate) => (
                        <button
                        key={cate.id}
                        onClick={() => setActiveId(cate.id)}
                        className={`border px-10 py-2 rounded-full font-bold transition ml-4
            ${activeId === cate.id ? 'bg-[#1B3C5C] text-white' : 'bg-white text-[#1B3C5C] border-[#1B3C5C]'}
          `}
                        >{cate.title}
                        </button>
                    ))}
                </div>
            </div>

        {/* 상품 슬라이드 */}
            <Swiper
                modules={[Autoplay, Scrollbar, Navigation]}
                spaceBetween={5}
                slidesPerView={4.3}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
            >
                {selectItems.map((item, id) => (
                    <SwiperSlide key={id}>
                        <div className="p-4 text-left">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.name} className="mx-auto mb-4 w-full object-cover rounded-lg" /></a>
                            <h3 className=" font-bold">{item.name}</h3>
                            <p className=" font-bold">{item.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </section>
    )
}
export default BestItem;