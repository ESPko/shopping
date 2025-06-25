import Header from "../../components/Header.jsx";
import MainContents from "./MainContents";

const MainPage = () => {
    return (
        <>
            {/*다른 페이지에서 사용 (검정 고정)*/}
            {/*<Header isDefaultBlack={true} />*/}

            {/* 메인 페이지에서만 사용 (hover 작동) */}
            <Header isDefaultBlack={false} />
            <MainContents />

        </>
    )
}
export default MainPage