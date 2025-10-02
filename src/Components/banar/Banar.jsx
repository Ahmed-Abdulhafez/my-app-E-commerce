import React from "react";
import "./banar.css";
import { Link } from "react-router";

const Banar = () => {
  return (
    <div className="h-auto py-10 px-4 mt-18 grid grid-cols-1 lg:grid-cols-2 gap-7 items-center justify-center select-none">
      {/* Banner Left */}
      <div className="relative group overflow-hidden">
        <img
          src="/image-banar/left-banner-image.jpg"
          alt="Main Banner"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-110 object-cover"
        />
        {/* Default Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-6 sm:px-10 transition-opacity duration-500 group-hover:opacity-0">
          <h2 className="text-2xl sm:text-3xl font-bold">We Are Hexashop</h2>
          <p className="mt-2 text-base sm:text-lg">Your fashion destination</p>
        </div>
        {/* Hover Content */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
          <div className="px-6">
            <h4 className="text-xl sm:text-2xl font-bold mb-2">Women</h4>
            <p className="mb-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>

      {/* Right Side Grid */}
      <div className="grid grid-cols-2 gap-7">
        {/* Reusable Component */}
        {[
          {
            id: 1,
            src: "/image-banar/baner-right-image-01.jpg",
            title: "Women",
            desc: "Best Clothes For Women",
            link: "/womens",
          },
          {
            id: 2,
            src: "/image-banar/baner-right-image-02.jpg",
            title: "Men",
            desc: "Best Clothes For Men",
            link: "/mens",
          },
          {
            id: 3,
            src: "/image-banar/baner-right-image-03.jpg",
            title: "Kids",
            desc: "Best Clothes For Kids",
            link: "/kids",
          },
          {
            id: 4,
            src: "/image-banar/baner-right-image-04.jpg",
            title: "Accessories",
            desc: "Best Trend Accessories",
            link: "/kids",
          },
        ].map((item) => (
          <div key={item.id} className="relative group overflow-hidden">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-110 object-cover"
            />
            {/* Default Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 group-hover:opacity-0">
              <h2 className="text-lg sm:text-xl font-bold">{item.title}</h2>
              <span className="text-sm sm:text-base">{item.desc}</span>
            </div>
            {/* Hover Content */}
            <Link
              to={item.link}
              className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
            >
              <div className="px-6">
                <h4 className="text-xl sm:text-2xl font-bold mb-2">
                  {item.title}
                </h4>
                <p className="mb-4 text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
                </p>
                <Link
                  to={item.link}
                  className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Discover More
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banar;
