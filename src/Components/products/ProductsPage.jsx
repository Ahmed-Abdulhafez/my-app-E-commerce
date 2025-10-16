import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../prodoctContextApi/ContextApi";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const { selsct, addToCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const imagesArray = selsct?.images || [];
  const [thumbnail, setThumbnail] = useState(
    imagesArray.length > 0
      ? typeof imagesArray[0] === "string"
        ? imagesArray[0]
        : imagesArray[0].url
      : ""
  );

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (imagesArray.length > 0) {
      setThumbnail(imagesArray[0]);
    }
  }, [selsct]);

  if (!selsct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            لم يتم اختيار منتج
          </h2>
          <p className="text-slate-500 mb-6">يرجى اختيار منتج لعرض التفاصيل</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selsct);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔹 مسار التنقل */}
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-slate-600 mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-indigo-600 transition-colors"
          >
            الرئيسية
          </button>
          <span className="text-slate-400">/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-indigo-600 transition-colors"
          >
            المنتجات
          </button>
          <span className="text-slate-400">/</span>
          {selsct.category && (
            <>
              <span className="text-slate-500 uppercase">
                {selsct.category.name}
              </span>
              <span className="text-slate-400">/</span>
            </>
          )}
          <span className="text-indigo-600 font-medium truncate">
            {selsct.title}
          </span>
        </nav>

        {/* 🔹 القسم الرئيسي */}
        <div className="bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* 🔹 قسم الصور */}
            <div className="space-y-6">
              {/* الصورة الرئيسية */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="aspect-square max-w-md mx-auto">
<img
  src={
    typeof (thumbnail?.url || thumbnail) === "string"
      ? (thumbnail.url || thumbnail).startsWith("http")
        ? thumbnail.url || thumbnail
        : `https://my-app-bacg-end.vercel.app/${(thumbnail.url || thumbnail).replace(/^\/+/, "")}`
      : imagesArray[0]
      ? typeof (imagesArray[0]?.url || imagesArray[0]) === "string"
        ? (imagesArray[0].url || imagesArray[0]).startsWith("http")
          ? imagesArray[0].url || imagesArray[0]
          : `https://my-app-bacg-end.vercel.app/${(imagesArray[0].url || imagesArray[0]).replace(/^\/+/, "")}`
        : "/placeholder.png"
      : "/placeholder.png"
  }
  alt={selsct.title || "Product Image"}
  className="w-full h-full object-contain rounded-xl transition-all duration-500 hover:scale-105"
/>

                </div>
              </div>

              {/* الصور المصغرة */}
              {imagesArray.length > 1 && (
                <div className="flex justify-center space-x-4 space-x-reverse">
                  {imagesArray.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setThumbnail(typeof img === "string" ? img : img.url);
                        setActiveImageIndex(index);
                      }}
                      className={`p-2 border-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                        activeImageIndex === index
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={typeof img === "string" ? img : img.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 🔹 تفاصيل المنتج */}
            <div className="flex flex-col space-y-8">
              {/* العنوان والفئة */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 leading-tight">
                  {selsct.title}
                </h1>
                {selsct.category && (
                  <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-2xl text-sm font-medium">
                    {selsct.category.name}
                  </div>
                )}
              </div>

              {/* التقييمات */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {renderStars(selsct.rating || 0)}
                </div>
                <span className="text-slate-500 text-lg">
                  {selsct.rating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">
                  ({selsct.numReviews || 0} تقييم)
                </span>
              </div>

              {/* السعر */}
              <div className="space-y-3">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-4xl font-bold text-green-600">
                    ${selsct.price}
                  </span>
                  {selsct.oldPrice && (
                    <span className="text-2xl text-slate-400 line-through">
                      ${selsct.oldPrice}
                    </span>
                  )}
                  {selsct.oldPrice && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      وفر ${(selsct.oldPrice - selsct.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm">شامل لجميع الضرائب</p>
              </div>

              {/* الوصف */}
              {selsct.desc && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">
                    وصف المنتج
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {selsct.desc}
                  </p>
                </div>
              )}

              {/* الكمية */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">الكمية</h3>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center border border-slate-300 rounded-2xl overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold text-slate-800 min-w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-slate-500 text-sm">
                    {selsct.stock || 10} متوفر في المخزون
                  </span>
                </div>
              </div>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 group"
                >
                  <svg
                    className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  أضف إلى السلة ({quantity})
                </button>

                <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-4 px-8 rounded-2xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center group">
                  <svg
                    className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  شراء الآن
                </button>
              </div>

              {/* معلومات إضافية */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    شحن سريع
                  </h4>
                  <p className="text-slate-500 text-sm">توصيل خلال 2-3 أيام</p>
                </div>

                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    ضمان الجودة
                  </h4>
                  <p className="text-slate-500 text-sm">منتجات أصلية 100%</p>
                </div>

                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    إرجاع سهل
                  </h4>
                  <p className="text-slate-500 text-sm">30 يوم للإرجاع</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 قسم المنتجات ذات الصلة (يمكن إضافته لاحقًا) */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              منتجات ذات صلة
            </h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center">
              مشاهدة الكل
              <svg
                className="w-4 h-4 mr-2"
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
          </div>
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              منتجات ذات صلة
            </h3>
            <p className="text-slate-500">سيتم عرض المنتجات المشابهة هنا</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
