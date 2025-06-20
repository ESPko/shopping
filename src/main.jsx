import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import {ClerkProvider} from "@clerk/clerk-react";
import { koreanLocalization } from "./LoginFile/clerk-ko.js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey} localization={koreanLocalization}>
          <App />
      </ClerkProvider>
  </StrictMode>,
)
