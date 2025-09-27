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
        const res = await axios.get("/data.json");
        setProduct(res.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
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


  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
