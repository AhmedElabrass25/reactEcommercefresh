import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WashListContext = createContext(0);
function WashListContextProvider({ children }) {
  const getHeaders = () => ({ token: localStorage.getItem("token") });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  {
    /* add Product To WashList  */
  }
  const addProductToWashList = async (id) => {
    // console.log(id);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers: getHeaders() }
      );
      getWatchlistProducts();
      toast.success("Success add to watchlist");
      // console.log(data);
    } catch (err) {
      toast.error("Faild to add to watchlist");
      console.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  {
    /* get Products form WashList  */
  }
  const getWatchlistProducts = async () => {
    try {
      setLoading(true);
      // Always fetch the latest token
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");
      const { data } = await axios(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: getHeaders() }
      );
      setProducts(data?.data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch products.");
      // console.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  {
    /* remove Product form WashList  */
  }
  const removeItemFromWatchlist = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: getHeaders() }
      );
      // console.log(data?.data);
      toast.success("The product is removed successfully", {
        style: {
          textAlign: "center",
        },
      });
      getWatchlistProducts();
      setError("");
    } catch (err) {
      toast.error(" Failed to remove product");
      console.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWatchlistProducts();
  }, []);
  return (
    <WashListContext.Provider
      value={{
        addProductToWashList,
        getWatchlistProducts,
        removeItemFromWatchlist,
        products,
        loading,
        error,
      }}
    >
      {children}
    </WashListContext.Provider>
  );
}
export default WashListContextProvider;
