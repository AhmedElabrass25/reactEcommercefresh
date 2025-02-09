import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { WashListContext } from "../../context/WashListContext";

const WashList = () => {
  let {
    getWatchlistProducts,
    products,
    loading,
    removeItemFromWatchlist,
    error,
  } = useContext(WashListContext);

  useEffect(() => {
    getWatchlistProducts();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          {loading && <Loading />}
          {!loading && error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full text-center tracking-[1.5px]"
              role="alert"
            >
              {error}
            </div>
          )}
          {/* <<<<<<<<<<<<<<<< Display WashList Products  >>>>>>>>>>>>>>>>>*/}
          {products?.length &&
            products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="relative card w-full sm:w-[45%] md:w-[32%] lg:w-[23%] p-4 mb-5 shadow-myShadow rounded-sm"
                >
                  <Link to={`/productdetails/${product.id}`}>
                    {/* Category Image*/}
                    <div className="imgDiv w-full h-[300px] mb-3">
                      <img
                        src={product.imageCover}
                        className="w-full h-full object-cover"
                        alt={product.title}
                      />
                    </div>
                    {/* Category Name*/}
                    <p className="text-main mb-1">{product?.category?.name}</p>
                    {/* Category Title*/}
                    <p className="capitalize">
                      {product?.title?.split(" ").slice(0, 2).join(" ")}
                    </p>
                    {/*Price 7 Rating*/}
                    <div className="w-full flex items-center justify-between mt-3">
                      <span>{`${product.price} EGP`}</span>
                      <span>
                        <i className="fa-solid fa-star text-yellow-300 me-1"></i>
                        {product?.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  {/* Submit Button*/}
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      className="w-full bg-red-900 text-white p-1 py-2 mt-4 rounded-lg font-semibold"
                      onClick={() => removeItemFromWatchlist(product.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default WashList;
