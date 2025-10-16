import React, { useEffect, useState } from "react";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://my-app-bacg-end.vercel.app/products/getProduct"
          // "http://localhost:5000/products/getProduct"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">Loading products...</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10 p-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white shadow-lg rounded-xl overflow-hidden w-64 transition-transform hover:scale-105"
        >
          <div className="relative group">
            {/* ✅ الصورة الرئيسية (مع حماية من undefined) */}
            <img
              className="w-full h-64 object-cover rounded-t-xl"
              src={p.images?.[0]?.url || "/placeholder.jpg"}
              alt={p.title}
            />

            {/* ✅ الصورة الثانية لو موجودة */}
            {p.images?.length > 1 && (
              <img
                className="w-full h-64 object-cover rounded-t-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                src={p.images?.[1]?.url}
                alt={p.title}
              />
            )}
          </div>

          <div className="p-4 flex flex-col gap-2">
            {/* الفئة */}
            {p.category && (
              <span className="text-xs text-gray-500 uppercase">
                {p.category.name}
              </span>
            )}

            {/* العنوان */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {p.title}
            </h3>

            {/* السعر */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                ${p.price}
              </span>
              {p.offerPrice && (
                <span className="text-sm line-through text-gray-400">
                  ${p.offerPrice}
                </span>
              )}
            </div>

            {/* العلامة المميزة */}
            {p.isFeatured && (
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                Featured
              </span>
            )}

            {/* التقييم */}
            <div className="text-sm text-gray-500">
              Rating: {p.rating} ({p.numReviews} reviews)
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
