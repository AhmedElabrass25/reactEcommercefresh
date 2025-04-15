import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
const MyNav = () => {
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  // console.log(cart);
  const [openMeue, setOpenMenue] = useState(false);
  const navigate = useNavigate();
  function logoutFunc() {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-light w-full sticky left-0 top-0 right-0 z-[999]">
        <div className="container w-full py-4 flex items-center justify-between">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              {/* logo */}
              <Link to="/" className="w-32 md:w-40">
                <img className="w-full" src={logo} alt="Your Company" />
              </Link>
              {/* Links In Large Page*/}
              <div className="hidden lg:block">
                {userToken && (
                  <div className="ml-5 md:max-lg:ml-2 flex items-baseline space-x-4">
                    <NavLink
                      to="/"
                      className="rounded-md px-2 py-2 text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/products"
                      className="rounded-md px-2 py-2 text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                    >
                      Products
                    </NavLink>
                    <NavLink
                      to="/categories"
                      className="rounded-md px-2 py-2 text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                    >
                      Categories
                    </NavLink>
                    <NavLink
                      to="/brands"
                      className="rounded-md px-2 py-2 text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                    >
                      Brands
                    </NavLink>
                    <NavLink
                      to="/washlist"
                      className="rounded-md px-2 py-2 text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                    >
                      WashList
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            {/* Login & Register Button In Large Page  + Cart Icon*/}
            <div className="hidden lg:block">
              <div className="ml-4 flex items-center md:ml-6">
                {userToken ? (
                  <>
                    <Link
                      to="/cart"
                      className="fa-solid fa-shopping-cart text-3xl me-4 relative text-main cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-[50%] bg-main absolute -left-[7px] -top-[13px] text-white flex items-center justify-center text-[15px]">
                        {cart?.numOfCartItems || 0}
                      </span>
                    </Link>
                    <span
                      onClick={() => logoutFunc()}
                      className="Btn text-[18px] font-medium text-gray-500 px-3 py-2 w-fit cursor-pointer"
                    >
                      Logout
                    </span>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="Btn block px-2 py-2 text-[18px] md:max-lg:text-[16px] text-gray-500 hover:text-white"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="Btn block px-2 py-2 text-[18px] md:max-lg:text-[16px] text-gray-500 hover:text-white"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Display In Mobile */}
          <div className="flex justify-end lg:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setOpenMenue(!openMeue)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {openMeue && (
          <div className="lg:hidden">
            {userToken && (
              <div className="px-2 pt-2 mb-5 ml-5 sm:px-3 flex flex-col gap-5">
                <NavLink
                  onClick={() => openMeue(false)}
                  to="/"
                  className="block rounded-md text-base font-medium text-gray-500"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => openMeue(false)}
                  to="/products"
                  className="block rounded-md text-base font-medium text-gray-500"
                >
                  Products
                </NavLink>
                <NavLink
                  onClick={() => openMeue(false)}
                  to="/categories"
                  className="block rounded-md  text-base font-medium text-gray-500"
                >
                  Categories
                </NavLink>
                <NavLink
                  onClick={() => openMeue(false)}
                  to="/brands"
                  className="block rounded-md  text-base font-medium text-gray-500"
                >
                  Brands
                </NavLink>
                <NavLink
                  onClick={() => openMeue(false)}
                  to="/washlist"
                  className="rounded-md  text-[18px] md:max-lg:text-[16px] font-medium text-gray-500"
                >
                  WashList
                </NavLink>
              </div>
            )}
            <div className="border-t border-gray-300 pb-3 pt-4 ml-2">
              <div className="my-2 flex items-center mx-3 px-2">
                {userToken ? (
                  <>
                    <span
                      onClick={() => logoutFunc()}
                      className="Btn text-[18px] font-medium text-gray-500 px-3 py-2 w-fit cursor-pointer"
                    >
                      Logout
                    </span>
                    <Link
                      onClick={() => openMeue(false)}
                      to="/cart"
                      className="fa-solid fa-shopping-cart text-3xl me-4 relative text-main cursor-pointer ms-5"
                    >
                      <span className="w-7 h-7 rounded-[50%] bg-main absolute -left-[7px] -top-[13px] text-white flex items-center justify-center text-[15px]">
                        {cart?.numOfCartItems || 0}
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="Btn block rounded-md px-3 py-2 text-base font-medium text-gray-500 w-fit hover:text-white"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="Btn block rounded-md px-3 py-2 text-base font-medium text-gray-500 w-fit hover:text-white"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default MyNav;
