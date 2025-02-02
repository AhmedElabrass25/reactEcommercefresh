import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext(0);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  let headers = { token: localStorage.getItem("token") };
  // >>>>>>>>>ADD PRODUCT TO CART
  async function addToCart(id) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: headers }
      );
      // console.log(data);
      getCarts(); //vip
      toast.success(data.message, {
        duration: 2000,
        position: "top-center",
        style: {
          zIndex: 10000,
          minWidth: "450px",
          fontSize: "17px",
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
    }
  }
  // >>>>>>>>>GET ALL CARTS
  async function getCarts() {
    try {
      setLoading(true);
      let { data } = await axios(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: headers,
        }
      );
      // console.log(data);
      setCart(data); //VIP
      setLoading(false);
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "faild to get all carts.......!",
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
  // >>>>>>>>>>Update Cart Quantity
  async function updateCart(id, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers: headers }
      );
      // console.log(data);
      setCart(data);
      toast.success("The updating " + data.status);
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "faild to upadate the cart.......!",
        {
          style: {
            minWidth: "600px",
          },
        }
      );
      // console.log(error);
    }
  }
  // >>>>>>>>>>Remove Cart Item
  async function removeCartItem(id) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        { headers: headers }
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
