import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./pages/proList/ProductList.jsx";

function Dajung() {
    return (
        <div>
              <main>
                  <Routes>
                      <Route path="/list" element={<ProductList/>} />
                  </Routes>
              </main>
        </div>
    );
}

export default Dajung