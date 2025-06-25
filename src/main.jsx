import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainPage from "./knh/pages/Home/MainPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <MainPage />

    </StrictMode>,
)
