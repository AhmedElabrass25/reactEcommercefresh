import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ResetPassword = () => {
  let { setUserToken } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // <<<<<<<<<<<<< (  Reset Password Function ) >>>>>>>>>>>>>
  async function resetPasswordFunc() {
    try {
      setLoading(true);
      let res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: email,
          newPassword: newPassword,
        }
      );

      toast.success("Operation success");
      console.log(res);
      localStorage.setItem("token", res.data.token);
      setUserToken(res.data.token);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error("Operation faild ," + " " + err);
    } finally {
      setLoading(false);
    }
  }
  // <<<<<<<<<<<<< (  Handle Submit Button ) >>>>>>>>>>>>>
  function handleSubmit(e) {
    e.preventDefault();
    resetPasswordFunc();
  }
  // <<<<<<<<<<<<>>>>>>>>>>>>>
  return (
    <>
      <section>
        <div className="container">
          <form className="md:w-1/2 mx-auto mt-10">
            {/* Your Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {/* New Password */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[18px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {/* Submit Button */}
            <button
              onClick={(e) => handleSubmit(e)}
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

export default ResetPassword;
