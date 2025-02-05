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
    <section>
      <div className="container">
        <div className="row">
          <MainSlider />
          <CategorySlider />
          <RecentProducts />
        </div>
      </div>
    </section>
  );
};

export default Home;
