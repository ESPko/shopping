import {BsChatDots} from "react-icons/bs";
import {FaFacebookF, FaInstagram} from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-white border-t text-sm text-gray-800 w-full border-gray-600">
            <div className="mobile:grid-cols-1 w-full max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-start">
            {/*    왼쪽*/}
                <div>
                    <ul className="space-y-2 mb-4 font-bold">
                        <li><a href="#" className="hover:underline">이용약관</a></li>
                        <li><a href="#" className="hover:underline">개인정보처리방침</a></li>
                        <li><a href="#" className="hover:underline">구매안전(에스크)서비스</a></li>
                    </ul>
                    <div className="flex space-x-4">
                        <a href="#"><FaInstagram size={20} /></a>
                        <a href="#"><FaFacebookF size={20} /></a>
                        <a href="#"><BsChatDots size={20} /></a>
                    </div>
                </div>
            {/*    중앙*/}
                <div className="leading-relaxed">
                    <p className="font-bold mb-1">CS 운영시간</p>
                    <p>월-금 10:00 ~ 17:00 (공휴일 휴무)</p>

                    <div className="mt-4">
                        <p className="font-bold mb-1">반품배송지</p>
                        <p>경기도 이천시 호법면 중부대로 797-37<br />1층 하이라이트브랜즈 물류센터</p>
                    </div>
                </div>
            {/*    오른쪽*/}
                <div className="leading-relaxed mobile:border-t mobile:pt-5">
                    <p><strong>Hilight Brands</strong> 주식회사 하이라이트브랜즈 | CEO. Jun Kwon Lee</p>
                    <p className="mt-2">
                        Business License No. 788-81-01239 [사업자정보확인]<br />
                        Mail Order Business Registration No. 2019-H8B-0523
                    </p>
                    <p className="mt-2">
                        Address. PDC Building 8F, 242, Pangyo-ro,<br />
                        Bundang-gu, Seongnam-si, Gyeonggi, Korea
                    </p>
                </div>
            </div>
        {/*    맨 밑*/}
            <div className="mx-16 mobile:mx-4 border-t pt-6 py-4 text-center text-xs text-gray-500">
                Hilight Brands is a division within Modern Works. The Diadora trademark, logo and trade dress are used by Modern Works under license from Diadora Company. <strong>© 2025 Hilight Brands</strong>
            </div>
        </footer>
    );
}

export default Footer