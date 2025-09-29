import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { ProductContext } from "./prodoctContextApi/ContextApi";

const NavBar = () => {
  const links = [
    { id: "1", name: "Home", path: "/" },
    { id: "2", name: "Men's", path: "/mens" },
    { id: "3", name: "Women's", path: "/womens" },
    { id: "4", name: "Kid's", path: "/kids" },
  ];

  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { quantity, message } = useContext(ProductContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        // لو نازل تحت → اخفي الناف
        setShowNav(false);
      } else {
        // لو طالع فوق → أظهر الناف
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-101 transition-transform duration-500 select-none ${
          showNav ? "translate-y-0" : "-translate-y-full"
        } bg-white shadow-md`}
      >
        {/* // allert message */}
        {message && (
          <div
            className={`fixed top-28 right-6 flex items-start gap-3 p-4 rounded-lg shadow-lg border w-80 animate-slide-in
      ${
        message.includes("✅")
          ? "bg-green-50 border-green-200 text-green-700"
          : message.includes("⚠️")
          ? "bg-yellow-50 border-yellow-200 text-yellow-700"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              {message.includes("✅") ? (
                <svg
                  className="w-5 h-5 text-green-500"
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
              ) : message.includes("⚠️") ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.662 1.732-3L13.732 4c-.77-1.338-2.694-1.338-3.464 0L3.34 16c-.77 1.338.192 3 1.732 3z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="font-semibold">
                {message.includes("✅")
                  ? "Success"
                  : message.includes("⚠️")
                  ? "Warning"
                  : "Error"}
              </h3>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        )}

        <div className="container mx-auto flex items-center justify-between px-6 py-8">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide cursor-pointer">
            Logo
          </div>

          {/* Links - للشاشات الكبيرة */}
          <ul className="gap-6 hidden md:flex">
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex gap-3 items-center">
            <Link to={"/ShoppingCart"}>
              <button className="relative ">
                <span className="absolute -top-4 -right-1 cursor-pointer bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {quantity}
                </span>
                <FiShoppingBag className="text-amber-700 text-2xl mr-4 cursor-pointer" />
              </button>
            </Link>
            <button className="hidden md:flex py-2 px-8 rounded-2xl hover:bg-amber-400 transition cursor-pointer bg-amber-200">
              Log in
            </button>
            <button className="hidden md:flex py-2 px-8 rounded-2xl hover:bg-amber-400 transition cursor-pointer bg-amber-200">
              Sign up
            </button>

            {/* Hamburger Menu Button */}
            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open ? (
                <IoMdClose className="text-2xl" />
              ) : (
                <IoMdMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-6 select-none px-6 pt-30 py-4 w-70 h-screen z-100 fixed right-0 text-center bg-gray-100 shadow-md md:hidden">
          {links.map((item) => (
            <li key={item.id} className="border-b  border-gray-300 pb-3">
              <Link
                to={item.path}
                className="block hover:text-yellow-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <button className="w-full py-2 px-8 rounded-2xl hover:bg-amber-400 transition cursor-pointer bg-amber-200">
              Log in
            </button>
          </li>
          <li>
            <button className="w-full py-2 px-8 rounded-2xl hover:bg-amber-400 transition cursor-pointer bg-amber-200">
              Sign up
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavBar;
