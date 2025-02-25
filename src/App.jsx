import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./components/NotFound/NotFound";
import MyNav from "./components/MyNav/MyNav";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
// <<<<lazy
const Categories = lazy(() => import("./components/Categories/Categories"));
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/Checkout/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import WashList from "./components/Washlist/WashList";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./components/ForgetPassword/VerifyResetCode";
import ResetPassword from "./components/ForgetPassword/ResetPassword";
import Loading from "./components/Loading/Loading";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="verifyresetcode" element={<VerifyResetCode />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="productdetails/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="brands"
            element={
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="allorders"
            element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="washlist"
            element={
              <ProtectedRoute>
                <WashList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
