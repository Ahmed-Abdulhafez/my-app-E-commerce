import React, { useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ProductContext } from "../prodoctContextApi/ContextApi";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

const SliderMan = () => {
  const { product, setSelect } = useContext(ProductContext);

  const products = product.men || [];
  return (
    <div>
      <div className="container mx-auto px-4 md:px-10 lg:px-15 mb-40 mt-20">
        <div className="mb-10 mt-16">
          <h1 className="text-4xl font-bold mb-2">Women's Latest</h1>
          <p className="text-gray-600">
            Details to details is what makes Hexashop different from the other
            themes.
          </p>
        </div>

        <div className="relative">
          <Swiper
            loop={products.length > 3} // لو عدد المنتجات أقل من 3، لا تعمل اللوب
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".man-swiper-next",
              prevEl: ".man-swiper-prev",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link
                    to={`/ProductsPage/${product.id}`}
                    onClick={() => setSelect(product)}
                    className="block"
                  >
                    <div
                      className="shadow-md flex flex-col items-center p-2 rounded-2xl 
      transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-50"
                    >
                      <div className="overflow-hidden rounded-xl w-full">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full object-cover h-[350px] mb-3 transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-center group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 text-center">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p className="text-center">جارِ التحميل...</p>
              </SwiperSlide>
            )}
          </Swiper>

          {/* أزرار التنقل خارج السلايدر */}
          {/* زر السابق */}
          <div
            className="man-swiper-prev absolute left-[-60px] top-1/2 -translate-y-1/2 
w-12 h-12 bg-white border border-black  flex items-center justify-center 
z-50 cursor-pointer transition duration-300 hover:scale-101"
          >
            <img
              src="/prev.png" // خلي الصورة في public واستخدم المسار كده
              alt="Previous"
              className="w-8 h-8 pr-2 object-contain"
            />
          </div>

          {/* زر التالي */}
          <div
            className="man-swiper-next absolute right-[-60px] top-1/2 -translate-y-1/2 
w-12 h-12 bg-white border border-black  flex items-center justify-center 
z-50 cursor-pointer transition duration-300  hover:scale-101"
          >
            <img
              src="/next.png" // نفس المبدأ
              alt="Next"
              className="w-8 h-8 pl-2  object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SliderMan;
