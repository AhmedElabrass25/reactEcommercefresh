import { useContext, useEffect } from "react";
import RecentProducts from "../RecentProduct/RecentProducts";
import CategorySlider from "./CategorySlider";
import MainSlider from "./MainSlider";
import { CartContext } from "../../context/CartContext";
const Home = () => {
  const { getCarts } = useContext(CartContext);
  useEffect(() => {
    getCarts();
  }, []);
  return (
    <div className="mt-[2px]">
      <MainSlider />
      <div className="container">
        <div className="row">
          <CategorySlider />
          <RecentProducts />
        </div>
      </div>
    </div>
  );
};

export default Home;
