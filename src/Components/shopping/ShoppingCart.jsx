import React, { useContext, useState } from "react";
import { ProductContext } from "../prodoctContextApi/ContextApi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ShoppingCart = () => {
  const { cart, removeItem, increaseQuantity, decreaseQuantity } =
    useContext(ProductContext);
  const [showAddress, setShowAddress] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.02;
  const shipping = total > 0 ? 0 : 0;
  const finalTotal = total + tax + shipping;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 pt-20 mt-20 mx-auto gap-6 select-none">
      {/* ✅ Cart Section */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500 font-normal">
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </span>
        </h1>

        {cart.length === 0 ? (
          <h1 className="text-center text-xl mt-10 text-gray-600">
            No products in cart
          </h1>
        ) : (
          <div className="space-y-4 h-scren pr-2">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {/* Products */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr] items-center bg-white/70 rounded-xl shadow-sm p-3 hover:shadow-md transition border"
              >
                {/* صورة + تفاصيل */}
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>

                    {/* ✅ التحكم في العدد */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <p className="text-center font-medium">
                  ${item.price * item.quantity}
                </p>

                {/* زر الحذف */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer mx-auto bg-red-500 text-white text-2xl rounded-full hover:bg-red-600 transition"
                >
                  <IoIosCloseCircleOutline />
                </button>
              </div>
            ))}

            <button className="group cursor-pointer flex items-center mt-6 gap-2 text-indigo-600 font-medium hover:gap-3 transition-all">
              <svg
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* ✅ Order Summary */}
      <div className="max-w-[360px] w-full sticky top-28 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200 self-start">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-gray-600">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer text-sm"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-10 py-1 bg-white rounded-lg shadow-md border border-gray-200 text-sm w-full z-10">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-50"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-gray-600">
            Payment Method
          </p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded-lg">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Price Details */}
        <div className="text-gray-600 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-semibold mt-3">
            <span>Total Amount:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
