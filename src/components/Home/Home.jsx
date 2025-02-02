import RecentProducts from "../RecentProduct/RecentProducts";
import CategorySlider from "./CategorySlider";
import MainSlider from "./MainSlider";
const Home = () => {
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
