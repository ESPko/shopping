import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CheckoutPage } from './ParkES/Checkout.jsx';
import { SuccessPage } from './ParkES/Success.jsx';
import { FailPage } from './ParkES/Fail.jsx';
import './ParkES/style.css';

const router = createBrowserRouter([
    {
        path: "/sandbox",
        element: <CheckoutPage />,
    },
    {
        path: "/sandbox/success",
        element: <SuccessPage />,
    },
    {
        path: "/sandbox/fail",
        element: <FailPage />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);