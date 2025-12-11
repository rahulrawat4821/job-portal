import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "FullStack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Android Developer",
  "Cloud Engineer",
];

const CategoryCarousel = () => {
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div key={index} className="px-4">
            <div className="bg-[#925def] text-white rounded-full py-4 px-6 text-center shadow-md hover:bg-[#5529a3] transition cursor-pointer">
              {cat}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
