import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
const Cart = () => {
  let { cart, loading, updateCart, removeCartItem } = useContext(CartContext);
  let allCarts = cart?.data?.products;
  // console.log(allCarts);

  return (
    <section className="w-full">
      <div className="container w-full">
        <div className="row w-full">
          {/* The Table */}
          <div className="relative w-full overflow-x-scroll md:overflow-hidden shadow-md sm:rounded-sm">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {loading && <Loading />}
                {allCarts &&
                  allCarts.map((cart) => {
                    return (
                      <tr
                        key={cart._id}
                        className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={cart?.product?.imageCover}
                            className="w-32 max-w-full max-h-full shadow-myShadow p-2 rounded-md"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {cart?.product?.brand?.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateCart(cart?.product?._id, cart.count - 1)
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1">
                                {cart?.count}
                              </span>
                            </div>
                            <button
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                              onClick={() =>
                                updateCart(cart?.product?._id, cart.count + 1)
                              }
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          ${cart?.price * cart?.count}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeCartItem(cart?.product?._id)}
                            className="font-medium bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-all ease-linear duration-300"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Empty State */}
        {!loading && allCarts?.length === 0 && (
          <div className="text-center py-8 md:hidden">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="bg-main text-white px-6 py-2 rounded-lg hover:bg-main-dark"
            >
              Continue Shopping
            </Link>
          </div>
        )}
        {/* Total and Checkout */}
        <div className="w-full flex justify-between items-center flex-wrap my-10">
          <h3 className="text-xl capitalize mb-3 sm:mb-0">
            Total Price :{" "}
            <span className="text-main"> $ {cart?.data?.totalCartPrice}</span>
          </h3>
          <Link
            to={"/checkout"}
            className="py-2 px-4 text-white bg-main rounded-md mb-3 sm:mb-0"
          >
            CheckOut
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
