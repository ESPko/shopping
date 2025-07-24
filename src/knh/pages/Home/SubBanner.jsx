const SubBanner = () => {
    const subBanner = {
        img: 'https://diadorakorea.com/web/upload/appfiles/0zdpAngaKBFnlCcCqpCU4A/3b606a91e8e2dc2eadb5ee73af646133.jpg',
        link: 'https://diadorakorea.com'
    }
    return (
        <section className="main-subbanner px-3 pt-40 mobile:pt-10">
            <a href={subBanner.link} target="_blank" rel="noopener noreferrer">
            <img
                src={subBanner.img}
                alt="서브 배너"
                className="w-full rounded-lg object-cover mobile:h-[100px]"
            /></a>
        </section>
    );
}

export default SubBanner;