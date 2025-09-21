import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { PiNotePencilFill } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fatchRecipe = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const { data } = await axios.get("http://localhost:5000/recipes");
      const myRecipes = data.filter((recipe) => recipe.createdBy === user._id);
      setRecipes(myRecipes);
    };
    fatchRecipe();
  }, []);

  const DeleteRecipe = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/recipes/${id}`);
      console.log(res);
      setRecipes((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-10 mt-20 bg-gray-100 py-20 min-h-screen w-full">
      <h2 className="text-2xl font-bold text-center my-8">My Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-center">No recipes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
          {recipes?.map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-xl transition-transform duration-500 hover:scale-105"
            >
              {/* صورة */}
              <img
                className="rounded-t-lg w-96 h-56 object-cover object-top"
                src={`http://localhost:5000/images/${recipe.imageUrl}`}
                alt={recipe.title}
              />

              {/* النصوص */}
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#ff5500]">
                  {recipe.title}
                </h5>
                <p className="mb-2 text-sm text-gray-700">
                  {recipe.ingredients}
                </p>
                <small className="text-gray-600">{recipe.instructions}</small>

                {/* أكشنات */}
                <div className="flex justify-between items-center mt-4">
                  <HiHeart className="text-2xl text-amber-500" />
                  <div className="flex gap-3 text-xl">
                    <Link
                      to={`/EditRecipe/${recipe._id}`}
                      className="hover:text-indigo-500"
                    >
                      <PiNotePencilFill />
                    </Link>
                    <button
                      onClick={() => DeleteRecipe(recipe._id)}
                      className="hover:text-red-500"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
