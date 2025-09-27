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
    <div className="p-20">
      <div className="container mx-auto p-4">
        {/* العنوان والوصف */}
        <div className=" mb-8 px-11">
          <h1 className="text-3xl font-bold mb-2">Social Media</h1>
          <p className="text-gray-600">
            Details to details is what makes Hexashop different from the other
            themes.
          </p>
        </div>

        {/* الصور */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-11">
          {images.length > 0 ? (
            images.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt="social"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
