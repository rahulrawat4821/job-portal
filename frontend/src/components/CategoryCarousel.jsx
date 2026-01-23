import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "../redux/jobSlice";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 relative">
      
      {/* LEFT BUTTON */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-white shadow-md rounded-full p-2
          hover:bg-gray-100 transition
        "
      >
        <FiChevronLeft size={22} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-white shadow-md rounded-full p-2
          hover:bg-gray-100 transition
        "
      >
        <FiChevronRight size={22} />
      </button>

      {/* SLIDER */}
      <Slider ref={sliderRef} {...settings}>
        {categories.map((cat, index) => (
          <div key={index} className="px-3">
            <button
              type="button"
              onClick={() => searchJobHandler(cat)}
              className="
                w-full
                bg-[#925def] text-white
                rounded-full
                py-3 sm:py-4
                px-6
                text-sm sm:text-base
                text-center
                shadow-md
                hover:bg-[#5529a3]
                transition-all duration-300
              "
            >
              {cat}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
