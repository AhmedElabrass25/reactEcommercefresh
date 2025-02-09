import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyResetCode = () => {
  let navigate = useNavigate();
  const [code, setCode] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    forgetPasswordFunc();
  }
  async function forgetPasswordFunc() {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: code,
        }
      );

      toast.success("Operation success");
      console.log(res);
      navigate("/reset-password");
    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message);
      toast.error("Operation faild ," + " " + err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section>
      <div className="container">
        <form className="md:w-1/2 mx-auto mt-10">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter the code to reset your password
            </label>
            <input
              onChange={(e) => setCode(e.target.value)}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="text-white bg-main hover:main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit{" "}
            {loading && (
              <i className="fas fa-spinner fa-spin text-[18px] ml-3"></i>
            )}
          </button>
          {/* {apiError && (
            <div
              className="w-full text-center p-2 my-4 text-[18px] tracking-[1.5px] text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          )} */}
        </form>
      </div>
    </section>
  );
};

export default VerifyResetCode;
