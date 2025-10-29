import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes";
import { CartProvider } from "./context/CartContext";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
