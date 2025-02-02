// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getBrands = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      // console.log(data.data);
      setBrands(data?.data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch products.");
      // console.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <section>
      <div className="container">
        <h2 className="bg-main text-white w-full text-center mb-5 rounded-sm py-2 capitalize">
          All brands
        </h2>
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
          {!loading &&
            brands.map((brand) => (
              <div
                key={brand._id}
                className="w-full sm:w-[43%] md:w-[32%] lg:w-[23%] shadow-myShadow mb-5 p-5 text-center"
              >
                <div className="imgDiv w-full h-[200px] overflow-hidden mb-3">
                  <img
                    src={brand?.image}
                    className="w-full h-full hover:scale-110 hover:rotate-[10deg] duration-300 transition-all ease-in "
                    alt=""
                  />
                </div>
                <p>{brand.name}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
