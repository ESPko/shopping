import Header from "../../components/Header.jsx";
import MainBanner from "./MainBanner.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import BestItem from "./BestItem.jsx";
import '/src/index.css'
import SubBanner from "./SubBanner.jsx";
import HighItem from "./HighItem.jsx";
import MediumBanner from "./MediumBanner.jsx";
import KeywordItem from "./KeywordItem.jsx";

const MainPage = () => {
    const MainContentTit = [
        {
            id: 1,
            title:'Best Item',
            subtitle:'가장 인기있는 아이템',
        },
        {
            id: 2,
            title:'Highlights',
            subtitle:'지금 필요한 초여름 피크닉 코디 아이템'
        },
        {
            id: 3,
            title: 'Style Keyword',
            subtitle:'지금 주목할 만한 키워드'
        }
    ]
    return (
        <>
            {/*다른 페이지에서 사용 (검정 고정)*/}
            {/*<Header isDefaultBlack={true} />*/}

            {/* 메인 페이지에서만 사용 (hover 작동) */}
                <Header isDefaultBlack={false} />
                <MainBanner />
                <BestItem mainContentTit={MainContentTit} />
                <SubBanner />
                <HighItem mainContentTit={MainContentTit} />
                <MediumBanner />
                <KeywordItem mainContentTit={MainContentTit} />
                <Footer />

        </>
    )
}
export default MainPage