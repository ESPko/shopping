import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CheckoutPage } from './ParkES/payment/checkout.jsx';
import { SuccessPage } from './ParkES/payment/success.jsx';
import { FailPage } from './ParkES/payment/fail.jsx';
import './ParkES/payment/style.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <CheckoutPage />,
    },
    {
        path: "/success",
        element: <SuccessPage />,
    },
    {
        path: "/fail",
        element: <FailPage />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);