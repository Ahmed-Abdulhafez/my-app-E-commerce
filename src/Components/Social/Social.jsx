import React, { useState, useEffect } from "react";
import axios from "axios";

const Social = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/data.json");
        setImages(data.data.Social || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-16 px-4 md:px-10 select-none">
      <div className="container mx-auto">
        {/* العنوان والوصف */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Social Media</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Details to details is what makes Hexashop different from the other
            themes.
          </p>
        </div>

        {/* الصور */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {images.length > 0 ? (
            images.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl shadow-lg group"
              >
                <img
                  src={item.image}
                  alt="social"
                  className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-75 group-hover:contrast-125"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              جاري تحميل الصور...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;
