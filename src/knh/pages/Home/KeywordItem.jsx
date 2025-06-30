import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination, Scrollbar} from "swiper/modules";

const KeywordItem = ({ mainContentTit }) => {
    const [activeId, setActiveId] = useState(1);
    const keywordItem = [
        {
            id: 1, // AIRTEX
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
            id: 2, // 여름 셋업
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
            id: 3, // 에어리
            items: [
                {
                    image: 'https://www.diadorakorea.com/web/product/small/202505/5a798fa50db9f2a1c68cd9842f3dfcf7.jpg',
                    name: '가방 BLACK',
                    price: '39,000원',
                    link: ''
                }
            ]
        },

    ];
    const itemCate = [
        {
            id: 1,
            title: '# AIRTEX',
        },
        {
            id: 2,
            title: '# 여름 SET-UP',
        },
        {
            id: 3,
            title: '# 에어리',
        },


    ]
    const activeCategory = keywordItem.find((cat) => cat.id === activeId);
    const selectItems = activeCategory ? activeCategory.items : [];
    return (
        <section className="main-keyword px-3 py-40">
            <div>
                {(() => {
                    const item = mainContentTit.find((content) => content.id === 3);
                    return item ? (
                        <div key={item.id}>
                            <h1 className="text-4xl font-[700]">{item.title}</h1>
                            <p className="text-lg font-thin">{item.subtitle}</p>
                        </div>
                    ) : null;
                })()}
            </div>
            <div>
                {itemCate.map((cate) => (
                    <button
                        key={cate.id}
                        onClick={() => setActiveId(cate.id)}
                        className={`text-2xl mb-5 px-2 pb-1 pt-5 mr-4 
            ${activeId === cate.id ? 'border-b-2 border-b-black font-bold' : ''}
          `}
                    >{cate.title}
                    </button>
                ))}
            </div>

            {/* 상품 슬라이드 */}
            <Swiper
                modules={[Autoplay, Pagination,  Navigation]}
                spaceBetween={5}
                slidesPerView={4.3}
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
                autoplay={{ delay: 4000 }}
                loop={true}
            >
                {selectItems.map((item, id) => (
                    <SwiperSlide key={id}>
                        <div className="p-4 text-left">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <img src={item.image} alt={item.name} className="max-w-full mb-4 w-full object-cover rounded-lg" /></a>
                            <h3 className=" font-bold">{item.name}</h3>
                            <p className=" font-bold">{item.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default KeywordItem;