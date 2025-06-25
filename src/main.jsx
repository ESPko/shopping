import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainPage from "./knh/pages/Home/MainPage.jsx";
import Dajung from "./JangDJ/Dajung.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*<App />*/}
        <MainPage />
        {/*<Dajung />*/}
    </StrictMode>,
)
