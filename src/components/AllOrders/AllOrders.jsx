import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState("");

  let token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  let id = decoded.id;
  async function getUserOrder() {
    try {
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            {orders &&
              orders.map((order) => {
                return (
                  <div
                    key={order._id}
                    className="w-full border-b-[2px] border-gray-300 pt-5"
                  >
                    <div className="flex items-center justify-center flex-wrap gap-3">
                      {order.cartItems &&
                        order.cartItems.map((cart) => {
                          return (
                            <div
                              key={cart._id}
                              className="w-full sm:w-[43%] md:w-[32%] lg:w-[23%] text-center shadow-myShadow p-3 mb-6"
                            >
                              <img
                                src={cart?.product?.imageCover}
                                className="w-full"
                              />
                              <p className="mb-3">
                                Count : {cart?.count}{" "}
                                {cart?.count > 1 ? "pieces" : "piece"}
                              </p>

                              <p>Price : $ {cart?.price}</p>
                            </div>
                          );
                        })}
                    </div>
                    <div className="my-10">
                      <p className="tracking-[1px] capitalize mb-6">
                        paid at : {order.paidAt}
                      </p>
                      <h3 className="capitalize text-2xl">
                        Total Price :{" "}
                        <span className="text-main">
                          $ {order.totalOrderPrice}
                        </span>
                      </h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllOrders;
