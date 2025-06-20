import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./LoginFile/SignInPage.jsx";
import SignUpPage from "./LoginFile/SignUpPage.jsx";
import TestHome from "./LoginFile/TestHome.jsx";
import CustomHome from "./CutomLoginFile/CustomHome.jsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<TestHome/>} />
          <Route path={'sign-in'} element={<SignInPage/>}/>
          <Route path={'sign-up'} element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
