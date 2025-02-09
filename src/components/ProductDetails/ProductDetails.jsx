import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import PageTitle from "../PageTitle";

const ProductDetails = () => {
  let { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let { id } = useParams();
  console.log(id);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    arrows: false,
  };
  async function getProguctDetails() {
    try {
      setLoading(true);
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      // console.log(data);
      setProduct(data?.data);
      setError("");
    } catch (error) {
      // console.log(error?.response?.data?.message);
      setError(
        error?.response?.data?.message || "Failed to fetch productDetails."
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProguctDetails();
  }, [id]);
  return (
    <>
      {loading && <Loading />}

      <section>
        <div className="container">
          <PageTitle title=" product details" />
          <div className="row">
            {!loading && error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full text-center tracking-[1.5px]"
                role="alert"
              >
                {error}
              </div>
            )}
            {/* Display Product Details */}
            {product && (
              <>
                {/* Side Slider */}
                <div className="w-full sm:w-1/4 shadow-myShadow mb-16">
                  <Slider {...settings} className="w-full">
                    {product.images?.map((img, index) => {
                      return (
                        <img
                          key={index}
                          src={img}
                          className="w-full object-cover object-center bg-no-repeat"
                          alt="image"
                        />
                      );
                    })}
                  </Slider>
                </div>
                {/* Description */}
                <div className="w-full sm:w-3/4 px-10">
                  <p className="w-full mb-1 tracking-[0.5px] text-[25px] ">
                    {product.title}.
                  </p>
                  <p className="w-full mb-3 tracking-[1px] text-[20px] text-gray-500">
                    {product.description}.
                  </p>
                  <p className="w-full mb-3 tracking-[1px] text-[20px] text-main">
                    {product?.category?.name}.
                  </p>

                  <div className="flex items-center justify-between w-full mb-5">
                    <p className="text-[18px]">{product.price} EGP</p>

                    <p className="text-[17px] ">
                      <i className="fa-solid fa-star text-yellow-300 me-1"></i>
                      {product?.ratingsAverage}
                    </p>
                  </div>
                  <div className="w-full text-center">
                    <button
                      className="w-full sm:w-[500px] bg-main text-white py-3 mt-4 rounded-md font-semibold mb-10 hover:scale-105 transition-all duration-500"
                      onClick={() => addToCart(product.id)}
                    >
                      ADD TO CART
                    </button>{" "}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Relate Products */}
          <div className="row my-10">
            <PageTitle title="related products" />
            <RelatedProducts category={product?.category?.name} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
