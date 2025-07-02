import Header from "../../components/Header.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SearchList from "./SearchList.jsx";
import Footer from "../../../JangDJ/Footer.jsx";

const SearchPage = () => {
    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40">
                <h2 className={'flex justify-center text-3xl font-bold'}>상품 검색</h2>
                <SearchBar />
                <SearchList />
            </section>
            <Footer />
        </>
    )
}
export default SearchPage;