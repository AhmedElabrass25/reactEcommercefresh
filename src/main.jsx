import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import WashListContextProvider from "./context/WashListContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <WashListContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </WashListContextProvider>
    </UserContextProvider>
  </StrictMode>
);
