import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../RecentProduct/ProductCard";

const RelatedProducts = ({ category }) => {
  console.log(category);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function relatedProductsFunc() {
    try {
      setLoading(true);
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(data?.data);
      let newProducts = data?.data.filter(
        (pro) => pro?.category?.name === category
      );
      setRelatedProducts(newProducts);
      console.log(newProducts);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setError(
        error?.response?.data?.message || "Failed to fetch productDetails."
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    relatedProductsFunc();
  }, [category]);
  return (
    <>
      {loading && <Loading />}
      {!loading && error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full text-center tracking-[1.5px]"
          role="alert"
        >
          {error}
        </div>
      )}
      {relatedProducts?.length > 0 &&
        relatedProducts.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
    </>
  );
};

export default RelatedProducts;
