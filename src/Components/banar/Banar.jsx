import React from "react";
import "./banar.css";

const Banar = () => {
  return (
    <div className="h-screen py-10 my-15 grid grid-cols-2 gap-7 items-center justify-center">
      {/* image-1 */}
      <div className="relative group overflow-hidden">
        <img
          src="/image-banar/left-banner-image.jpg"
          alt=""
          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
        />

        {/* النص الأساسي (مزحزح لليمين) */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-10 transition-opacity duration-500 group-hover:opacity-0">
          <h2 className="text-3xl font-bold">We Are Hexashop</h2>
          <p className="mt-2 text-lg">Your fashion destination</p>
        </div>

        {/* محتوى الهوفر */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
          <div className="px-6">
            <h4 className="text-2xl font-bold mb-2">Women</h4>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
            </p>
            <div>
              <a
                href="#"
                className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* right side grid */}
      <div className="grid grid-cols-2 gap-7">
        {/* image-2 */}
        <div className="relative group overflow-hidden">
          <img
            src="/image-banar/baner-right-image-01.jpg"
            alt=""
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 group-hover:opacity-0">
            <h2 className="text-xl font-bold">Women</h2>
            <span>Best Clothes For Women</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            <div className="px-6">
              <h4 className="text-2xl font-bold mb-2">Women</h4>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
              </p>
              <div>
                <a
                  href="#"
                  className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* image-3 */}
        <div className="relative group overflow-hidden">
          <img
            src="/image-banar/baner-right-image-02.jpg"
            alt=""
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 group-hover:opacity-0">
            <h2 className="text-xl font-bold">Men</h2>
            <span>Best Clothes For Men</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            <div className="px-6">
              <h4 className="text-2xl font-bold mb-2">Men</h4>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
              </p>
              <div>
                <a
                  href="#"
                  className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* image-4 */}
        <div className="relative group overflow-hidden">
          <img
            src="/image-banar/baner-right-image-03.jpg"
            alt="Kids Banner"
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 group-hover:opacity-0">
            <h2 className="text-xl font-bold">Kids</h2>
            <span>Best Clothes For Kids</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            <div className="px-6">
              <h4 className="text-2xl font-bold mb-2">Kids</h4>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit incid.
              </p>
              <div>
                <a
                  href="#"
                  className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* image-5 */}
        <div className="parent relative group overflow-hidden">
          <img
            src="/image-banar/baner-right-image-04.jpg"
            alt=""
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="name absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 group-hover:opacity-0">
            <h2 className="text-xl font-bold">Accessories</h2>
            <span>Best Trend Accessories</span>
          </div>
          <div className="hover-content absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            <div className="inner px-6">
              <h4 className="text-2xl font-bold mb-2">Accessories</h4>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="main-border-button">
                <a
                  href="#"
                  className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banar;
