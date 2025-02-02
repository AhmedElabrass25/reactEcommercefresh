import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  let { setUserToken } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function loginFunc(values) {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("token", res.data.token);
      setUserToken(res.data.token);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  let schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required .")
      .email("email is invalid ."),
    password: Yup.string()
      .required("password is required .")
      .matches(/^[A-Za-z0-9]\w{4,20}$/, "inValid password ."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginFunc,
    validationSchema: schema,
  });
  return (
    <section>
      <div className="container">
        <form className="md:w-1/2 mx-auto mt-10" onSubmit={formik.handleSubmit}>
          {/* email Field */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
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
          {/* password Field */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        {/* Forgot Password */}
        <div className="text-center">
          <Link className="underline text-main text-lg" to="/forgetpassword">
            Forget Password
          </Link>
        </div>
        {/* Signup Link */}
        <p className="text-xl mt-3 w-full text-center">
          Do not have an account .{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-main cursor-pointer"
            to="register"
          >
            SignUp
          </span>
        </p>
        {/* API Error Message */}
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
  );
};

export default Login;
