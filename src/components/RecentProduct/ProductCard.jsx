import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WashListContext } from "../../context/WashListContext";

const ProductCard = ({ product }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);

  let { addToCart } = useContext(CartContext);
  let { addProductToWashList, products } = useContext(WashListContext);
  const isInWishlist = products.some((pro) => pro.id === product.id);
  async function addToWashListFunc(id) {
    setHeartLoading(true);
    await addProductToWashList(id);
    setHeartLoading(false);
  }
  async function handleAddToCart(id) {
    setButtonLoading(true);
    await addToCart(id);
    setButtonLoading(false);
  }
  return (
    <>
      <div
        key={product.id}
        className="relative card w-full sm:w-[45%] md:w-[32%] lg:w-[23%] p-4 mb-5 shadow-myShadow hover:shadow-lg rounded-md"
      >
        <span
          className="absolute left-3 top-4 cursor-pointer bg-[#f6f6f6] p-1"
          onClick={() => addToWashListFunc(product.id)}
        >
          {heartLoading ? (
            <i className="fas fa-spinner fa-spin text-[18px]"></i>
          ) : (
            <i
              className={`fa-solid fa-heart text-[20px] ${
                isInWishlist ? "text-red-600" : "text-black/80"
              }`}
            ></i>
          )}
        </span>
        <Link to={`/productdetails/${product.id}`}>
          {/* Product Image */}
          <div className="imgDiv w-full h-[300px] mb-3 overflow-hidden">
            <img
              src={product.imageCover}
              className="w-full h-full object-cover"
              alt={product.title}
            />
          </div>
          {/* Product Name */}
          <p className="text-main mb-1">{product?.category?.name}</p>
          {/* Product Title */}
          <p className="capitalize">
            {product?.title?.split(" ").slice(0, 2).join(" ")}
          </p>
          {/* Product Price & Rating */}
          <div className="w-full flex items-center justify-between mt-3">
            <span>{`${product.price} EGP`}</span>
            <span>
              <i className="fa-solid fa-star text-yellow-300 me-1"></i>
              {product?.ratingsAverage}
            </span>
          </div>
        </Link>
        <button
          className="w-full bg-main text-white p-1 py-2 mt-4 mb-3 rounded-lg font-semibold hover:scale-105 transition-all duration-500 capitalize"
          onClick={() => handleAddToCart(product.id)}
        >
          {buttonLoading ? (
            <i className="fas fa-spinner fa-spin text-[18px]"></i>
          ) : (
            "add to cart"
          )}
        </button>
      </div>
    </>
  );
};

export default ProductCard;
