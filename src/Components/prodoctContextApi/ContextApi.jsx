import axios from "axios";
import { createContext, useState, useEffect, useRef } from "react";

//1- createContext
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  //2- create states
  const [product, setProduct] = useState([]);
  const [selsct, setSelect] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null); // للتحكم في التايمر

  //3- fetch data from API
useEffect(() => {
  const fetchData = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/products/getProduct");


      const res = await axios.get("https://my-app-bacg-end.vercel.app/products/getProduct");
      setProduct(res.data || []);
      console.log("Products fetched:", res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response) {
        console.log("Server responded with:", err.response.data);
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Axios error:", err.message);
      }
    }
  };

  fetchData();
}, []);


  // function to show toast message
  const showMessage = (msg, duration = 2500) => {
    // امسح أي تايمر قديم
    if (timerRef.current) clearTimeout(timerRef.current);

    // اعرض الرسالة الجديدة فورًا
    setMessage(msg);

    // بعد انتهاء المدة امسحها
    timerRef.current = setTimeout(() => {
      setMessage(null);
      timerRef.current = null; // Reset clean
    }, duration);
  };

  // addToCart function
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === item.id);

      if (existing) {
        showMessage("⚠️ المنتج موجود بالفعل في السلة");
        return prevCart;
      } else {
        showMessage("✅ تمت إضافة المنتج بنجاح");
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // حساب الكمية الإجمالية في السلة
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // زيادة الكمية
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // تقليل الكمية (مع منع النزول لأقل من 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  return (
    // 4- Wrap children with Provider
    <ProductContext.Provider
      value={{
        product,
        selsct,
        setSelect,
        cart,
        addToCart,
        quantity,
        message,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
