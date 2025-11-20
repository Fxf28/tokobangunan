// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"; // --- BARU ---

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* --- BARU --- */}
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
      {/* --- BARU --- */}
    </BrowserRouter>
  </StrictMode>
);
