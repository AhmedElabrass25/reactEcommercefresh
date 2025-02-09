import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const ForgetPassword = () => {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // <<<<<<<<<<<<< ( Forget Password Function ) >>>>>>>>>>>>>
  async function forgetPasswordFunc(values) {
    console.log(values);
    let email = values.email;
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: email,
        }
      );

      toast.success("Operation success ," + data?.message);
      console.log(data);
      navigate("/verifyresetcode");
    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  // <<<<<<<<<<<<< ( Yup) >>>>>>>>>>>>>
  let schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required .")
      .email("email is invalid ."),
  });
  // <<<<<<<<<<<<< ( Formik ) >>>>>>>>>>>>>
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPasswordFunc,
    validationSchema: schema,
  });
  //<<<<<<>>>>>>>>>>>>
  return (
    <div>
      <section>
        <div className="container">
          <form
            className="md:w-1/2 mx-auto mt-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-main hover:main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Send{" "}
              {loading && (
                <i className="fas fa-spinner fa-spin text-[18px] ml-3"></i>
              )}
            </button>
          </form>
          {apiError && (
            <div
              className="w-full text-center p-2 my-4 text-[18px] tracking-[1.5px] text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
