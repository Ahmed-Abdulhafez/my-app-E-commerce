import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiHeart } from "react-icons/hi2";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/recipes").then((res) => {
      setRecipes(res.data);
    });
  }, []);
  return (
<div className="py-10 bg-gray-100 w-full">
  <h2 className="text-2xl font-bold text-center my-8">All Recipes</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
    {recipes?.map((recipe) => (
      <div
        key={recipe._id}
        className="p-4 bg-white rounded-lg shadow max-w-80 hover:shadow-xl transition-transform duration-500 hover:scale-105 cursor-pointer group relative"
      >
        {/* الصورة */}
        <img
          className="rounded-md max-h-40 w-full object-cover"
          src={`http://localhost:5000/images/${recipe.imageUrl}`}
          alt={recipe.title}
        />

        {/* العنوان */}
        <p className="text-gray-900 text-xl font-semibold ml-2 mt-2 group-hover:text-[#ff5500]">
          {recipe.title}
        </p>

        {/* المكونات */}
        <p className="text-gray-500 text-sm my-3 ml-2">
          {recipe.ingredients}
        </p>

        {/* التعليمات */}
        <small className="text-sm ml-2">{recipe.instructions}</small>
      </div>
    ))}
  </div>
</div>

  );
};

export default AllRecipes;
