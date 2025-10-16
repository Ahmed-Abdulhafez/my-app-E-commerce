import React, { useContext, useMemo } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ProductContext } from "../prodoctContextApi/ContextApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const SliderMan = ({ categoryName = "Women's" }) => {
  const { product, setSelect } = useContext(ProductContext);

  // استخدام useMemo لتحسين الأداء
  const featuredProducts = useMemo(() => {
    const products = product || [];
    return products.filter(
      (item) => item.isFeatured && item.category?.name === categoryName
    );
  }, [product, categoryName]);

  // دالة لتقديم النجوم
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      let starClass = "text-gray-300";

      if (starValue <= Math.floor(rating)) {
        starClass = "text-yellow-400";
      } else if (rating - i > 0.5) {
        starClass = "text-yellow-300";
      }

      return (
        <span key={i} className={`text-lg ${starClass} transition-colors`}>
          ★
        </span>
      );
    });
  };

  // حالة التحميل
  if (!product) {
    return (
      <section className="mx-5 md:mx-10 lg:mx-15 mt-10 select-none">
        <div className="mb-10 mt-5">
          <h1 className="text-4xl font-bold mb-2">{categoryName}'s Latest</h1>
          <p className="text-gray-600">
            Details to details is what makes Hexashop different from the other
            themes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-xl mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-5 md:mx-10 lg:mx-15 mt-10 select-none">
      {/* 🔹 Header Section */}
      <div className="mb-10 mt-5 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-900">
          {categoryName}'s Latest
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto lg:mx-0 text-base md:text-lg">
          Details to details is what makes Hexashop different from the other
          themes.
        </p>
      </div>

      <div className="relative ">
        <Swiper
          loop={featuredProducts.length > 3}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-indigo-600 opacity-50 hover:opacity-100 transition-opacity"></span>`;
            },
          }}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper pb-12"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <SwiperSlide key={product._id} className="py-2">
                <Link
                  to={`/ProductsPage/${product._id}`}
                  onClick={() => setSelect(product)}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {/* 🔹 Image Container with Hover Effect */}
                    <div className="relative overflow-hidden bg-gray-50">
                      <div className="aspect-w-3 aspect-h-4 h-72">
                        <img
                          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                          src={product.images[0]?.url}
                          alt={product.title}
                          loading="lazy"
                        />

                        {product.images.length > 1 && (
                          <img
                            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-110"
                            src={product.images[1]?.url}
                            alt={product.title}
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* 🔹 Badge for Featured Products */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* 🔹 Product Info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 mr-3">
                          <h3 className="text-lg font-bold text-gray-900 truncate transition-colors group-hover:text-indigo-600">
                            {product.title}
                          </h3>
                          <p className="text-xl font-bold text-gray-900 mt-2">
                            ${product.price}
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${product.originalPrice}
                              </span>
                            )}
                          </p>
                        </div>

                        {/* 🔹 Rating Section */}
                        {product.rating && (
                          <div className="flex flex-col items-end flex-shrink-0">
                            <div className="flex space-x-1 mb-1">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 🔹 Additional Info (إذا كان متوفرًا) */}
                      {product.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Featured Products
                </h3>
                <p className="text-gray-500">
                  No featured products found in {categoryName} category.
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* 🔹 Custom Navigation Buttons */}
        <button className="custom-swiper-prev absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white border border-gray-200 hover:border-indigo-400 rounded-full flex items-center justify-center z-10 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm">
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="custom-swiper-next absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white border border-gray-200 hover:border-indigo-400 rounded-full flex items-center justify-center z-10 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm">
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SliderMan;
