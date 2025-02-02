import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4, // Show 4 slides
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 3, // Show 3 slides
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 600, // For screens smaller than 480px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 400, // For screens smaller than 480px
        settings: {
          slidesToShow: 1, // Show 2 slides
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  async function getAllGategory() {
    try {
      let { data } = await axios(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data?.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }
  useEffect(() => {
    getAllGategory();
  }, []);
  return (
    <div className="w-full my-6">
      <h2 className="text-gray-700 capitalize mb-2">Categories</h2>
      <Slider {...settings}>
        {categories.map((cat) => (
          <div key={cat._id} className="text-center p-2 shadow-myShadow p-5">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-[200px] object-cover object-top rounded-lg"
            />
            <p className="mt-2 text-sm font-semibold text-gray-700">
              {cat.name}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
