import { useFormik } from "formik";
// eslint-disable-next-line no-unused-vars
import style from "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "minLength is 3.")
    .max(15, "maxLength is 15."),
  email: Yup.string().required("Email is required.").email("Email is inValid"),
  password: Yup.string()
    .required("password is required.")
    .matches(/^[A-Za-z0-9]\w{4,20}$/, "Password is inValid(ex ahmed123456)"),
  rePassword: Yup.string()
    .required("rePassword is required.")
    .oneOf(
      [Yup.ref("password")],
      "The rePassword does not match to the password"
    ),
  phone: Yup.string()
    .required("Phone is required.")
    .matches(/^01[0125][0-9]{8}$/, "Phone should be egyption number"),
});
const Register = () => {
  let { setUserToken } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function registerFunc(values) {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      localStorage.setItem("token", res?.data?.token);
      setUserToken(res?.data?.token);
      console.log(res.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      let theError = err.response.data.message;
      setApiError(err.response?.data?.message || "Something went wrong!");
      setApiError(theError);
      setLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: registerFunc,
  });
  return (
    <section>
      <div className="container">
        <form className="md:w-1/2 mx-auto mt-10" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="z-0 w-full mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Enter Your Name
            </label>
            <input
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-main block w-full p-2.5 text-[px]"
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          )}
          {/* Email Field */}
          <div className="w-full mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-main block w-full p-2.5 text-[px]"
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
          {/* Password Field */}
          <div className="w-full mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-main block w-full p-2.5 text-[px]"
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          )}
          {/* rePassword Field */}
          <div className="w-full mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-main block w-full p-2.5 text-[px]"
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          )}
          {/* Phone Field */}
          <div className="w-full mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone
            </label>
            <input
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-main block w-full p-2.5 text-[px]"
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-main hover:main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 flex items-center justify-center"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin text-[18px]"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {/* Signin Link */}
        <p className="text-xl mt-3 w-full text-center">
          have an account .{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-main cursor-pointer"
            to="register"
          >
            Login
          </span>
        </p>
        {/* API Error Message */}
        {apiError && (
          <div
            className="p-2 mb-4 text-[18px] tracking-[1.5px] text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
