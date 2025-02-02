import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import banner1 from "../../assets/images/grocery-banner.png";
import banner2 from "../../assets/images/grocery-banner-2.jpeg";

const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
  };
  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-0 mb-4">
      <Slider {...settings} className="w-full sm:w-3/4">
        <img
          src={img1}
          alt="img1"
          className="w-full h-[400px] object-cover object-top"
        />
        <img
          src={img2}
          alt="img1"
          className="w-full h-[400px] object-cover object-top"
        />
        <img
          src={img3}
          alt="img2"
          className="w-full h-[400px] object-cover object-top"
        />
      </Slider>
      <div className="w-full sm:w-1/4 h-[400px] flex flex-col">
        <img
          src={banner1}
          className="w-full h-full object-cover object-right"
          alt=""
        />
        <img
          src={banner2}
          className="w-full h-full object-cover object-right"
          alt=""
        />
      </div>
    </div>
  );
};

export default MainSlider;
