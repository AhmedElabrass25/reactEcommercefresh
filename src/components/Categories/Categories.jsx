// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      console.log(data.data);
      setCategories(data?.data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch products.");
      console.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <section>
      <div className="container">
        <h2 className="bg-main text-white w-full text-center mb-5 rounded-sm py-2">
          Categories{" "}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-5">
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
            categories.map((cat) => (
              <div
                key={cat._id}
                className="w-full sm:w-[43%] md:w-[32%] lg:w-[23%] shadow-myShadow mb-5 p-5 text-center"
              >
                <div className="imgDiv w-full h-[200px] overflow-hidden mb-3">
                  <img
                    src={cat?.image}
                    className="w-full h-full hover:scale-110 hover:rotate-[10deg] duration-300 transition-all ease-in "
                    alt=""
                  />
                </div>
                <p>{cat.name}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
