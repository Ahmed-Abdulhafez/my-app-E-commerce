import { Link } from "react-router";
import { ProductContext } from "../prodoctContextApi/ContextApi";
import React, { useContext } from "react";

const Women = () => {
  const { product, setSelect, addToCart } = useContext(ProductContext);
  const products = product.women;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // دالة لاختيار المنتج وتحديث الحالة في Context API
  const handleSelectProduct = (item) => {
    setSelect(item);
  };
  return (
    <div className="container mx-auto px-6 py-12 mt-18 font-poppins">
      {/* Title Section */}
      <div className=" mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Women's Collection
        </h1>
        <p className="text-slate-600 text-lg">
          Explore the latest additions to our collection.
        </p>
      </div>

      {/* Products Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="group bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link
                to={`/ProductsPage/${item.id}`}
                onClick={() => handleSelectProduct(item)}
              >
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 mb-3">
                    {item.description || "No description available."}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      ${item.price}
                    </span>
                    <span className="flex items-center text-yellow-500 font-medium">
                      {"★".repeat(item.start)}{" "}
                      <span className="ml-1 text-gray-600 text-sm">
                        ({item.start})
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
              {/* ✅ زرار Add to Cart برا الـ Link */}
              <button
                onClick={() => handleAddToCart(item)}
                className=" m-4 w-[90%] py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Loading products...
          </p>
        )}
      </section>
    </div>
  );
};

export default Women;
