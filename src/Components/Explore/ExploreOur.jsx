import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreOur = () => {
  const [img, setImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/data.json"); // لو الملف داخل public
        setImg(res.data.ExploreOur || []); // fallback عشان ما يحصلش error
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-15 py-10 grid grid-cols-2 gap-7">
      <div className="mb-6">
        <p className="text-1xl mb-6 text-gray-500 italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas labore
          explicabo pariatur deleniti ipsum veritatis accusamus cupiditate qui
          dolore necessitatibus nisi ea iusto quisquam harum tempore vitae,
          possimus alias quis.
        </p>
        <p className="text-1xl my-8 mt-12 text-gray-500 italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas labore
          explicabo pariatur deleniti ipsum veritatis accusamus cupiditate qui
          dolore necessitatibus nisi ea iusto quisquam harum tempore vitae,
          possimus alias quis.
        </p>
        <p className="text-1xl my-8 mt-12 text-gray-500 italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas labore
          explicabo pariatur deleniti <br />{" "}
          <span className=" text-amber-500 text-[20px] ">
            <Link>support us </Link>
          </span>
          ipsum veritatis accusamus cupiditate qui dolore necessitatibus nisi ea
          iusto quisquam harum tempore vitae, possimus alias quis.
        </p>
        <Link className="mt-8 inline-block" to="/products">
          <button className="bg-amber-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-amber-600 transition duration-300">
            Discover More
          </button>
        </Link>
      </div>

      <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-2 gap-6">
        {img.length > 0 ? (
          img.map((item) => (
            <div key={item.id} className="shadow-md rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt="image"
                className="w-full h-64 object-cover"
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">جارِ التحميل...</p>
        )}
      </div>
    </div>
  );
};

export default ExploreOur;
