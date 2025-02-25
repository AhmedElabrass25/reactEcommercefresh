import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext(0);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const getHeaders = () => ({ token: localStorage.getItem("token") });
  // >>>>>>>>>ADD PRODUCT TO CART
  async function addToCart(id) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: getHeaders() }
      );
      // console.log(data);
      getCarts(); //vip
      toast.success("The Product is added successfully to cart", {
        duration: 2000,
        position: "top-center",
        style: {
          zIndex: 100000,
          minWidth: "450px",
          fontSize: "16px",
        },
      });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "faild to add to cart.......!",
        {
          style: {
            minWidth: "600px",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  }
  // >>>>>>>>>GET ALL CARTS
  async function getCarts() {
    try {
      setLoading(true);
      // Always fetch the latest token
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");
      let { data } = await axios(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: getHeaders(),
        }
      );
      // console.log(data);
      setCart(data); //VIP
      setLoading(false);
      return data;
    } catch (error) {
      console.log(
        error?.response?.data?.message || "faild to get all carts.......!"
      );
    } finally {
      setLoading(false);
    }
  }
  // >>>>>>>>>>Update Cart Quantity
  async function updateCart(id, count) {
    try {
      setLoading(true);

      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers: getHeaders() }
      );
      // console.log(data);
      setCart(data);
      toast.success("The updating " + data.status, {
        position: "top-center",
        zIndex: "100000",
      });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "faild to upadate the cart.......!",
        {
          position: "top-center",
          zIndex: "100000",
          style: {
            minWidth: "600px",
          },
        }
      );
      // console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // >>>>>>>>>>Remove Cart Item
  async function removeCartItem(id) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        { headers: getHeaders() }
      );
      // console.log(data);
      setCart(data);
      toast.success("The item is removed successfully");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "faild to remove item from cart.......!",
        {
          style: {
            minWidth: "600px",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getCarts();
  }, []);
  return (
    <CartContext.Provider
      value={{ getCarts, addToCart, cart, loading, updateCart, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
