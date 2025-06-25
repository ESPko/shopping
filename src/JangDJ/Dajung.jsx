import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./ProductList.jsx";

function Dajung() {
    return (
        <div>
          <BrowserRouter>
              <main>
                  <Routes>
                      <Route path="/list" element={<ProductList/>} />
                  </Routes>
              </main>
          </BrowserRouter>
        </div>
    );
}

export default Dajung