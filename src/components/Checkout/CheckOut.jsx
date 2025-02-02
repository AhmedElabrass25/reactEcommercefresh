import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

const CheckOut = () => {
  let { cart } = useContext(CartContext);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  let headers = {
    token: localStorage.getItem("token"),
  };
  async function loginFunc(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        { shippingAddress: shippingAddress },
        { headers: headers }
      );
      console.log(data);
      toast.success(data?.status);
      window.location.href = data.session.url; //VIP
    } catch (err) {
      console.log(err?.response?.data?.message);
      setApiError(err.response.data.message);
      toast.error("invalid ID undefined");
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: loginFunc,
  });
  return (
    <>
      <section>
        <div className="container">
          <form
            className="md:w-1/2 mx-auto mt-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your City
              </label>
              <input
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="details"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Details
              </label>
              <input
                type="text"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="details"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Phone
              </label>
              <input
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-main hover:main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit{" "}
              {loading && (
                <i className="fas fa-spinner fa-spin text-[18px] ml-3"></i>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
