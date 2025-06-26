const HighItem = ({mainContentTit}) => {
    const HighItem = [
        {
            id: 1,
            img:'',
            name:'',
            price:'',

        }
    ]
    return (
        <section className={'main-high px-3 pt-40'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 2);
                        return item ? (
                            <div key={item.id}>
                                <h1 className={'text-4xl font-[700]'}>{item.title}</h1>
                                <p className={'text-lg font-thin'}>{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>
                <button className={'border px-10 py-2 rounded-full font-bold text-white bg-[#1B3C5C]'}>더보기</button>
            </div>
        </section>
    )
}
export default HighItem