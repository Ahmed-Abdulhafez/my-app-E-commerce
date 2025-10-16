import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]); // ✅ لحفظ الصور (٦ صور)

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    isFeatured: false,
    rating: "",
    numReviews: "",
  });

  // ✅ تحميل الفئات من السيرفر
  useEffect(() => {
    const loadCats = async () => {
      try {
        // const res = await axios.get(
        //   "http://localhost:5000/category/getCategory"
        // );
        const res = await axios.get(
          "https://my-app-bacg-end.vercel.app/category/getCategory"
        );
        setCategory(res.data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCats(false);
      }
    };
    loadCats();
  }, []);

  // ✅ تغيير القيم في الحقول النصية
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ تحميل الصور
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  // ✅ إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (
      !form.title ||
      !form.desc ||
      !form.price ||
      !form.brand ||
      !form.stock
    ) {
      setMsg("⚠️ Please fill in all required fields.");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    images.forEach((img) => {
      if (img) fd.append("images", img);
    });

    try {
      setSubmitting(true);
      // const res = await axios.post(
      //   "http://localhost:5000/products/createProduct",
      //   fd,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      const res = await axios.post(
        "https://my-app-bacg-end.vercel.app/products/createProduct",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status !== 201 && res.status !== 200) {
        throw new Error("Failed to create product");
      }

      setMsg("✅ Product added successfully!");
      setForm({
        title: "",
        desc: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        isFeatured: false,
        rating: "",
        numReviews: "",
      });
      setImages([]);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-6 space-y-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Product
        </h2>

        {/* ✅ رفع الصور */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {Array(6) // ✅ بدل ٤ → ٦ صور
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    className="max-w-24 border rounded-md hover:opacity-80 transition"
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
                        : "https://placehold.co/100x100?text=Upload"
                    }
                    alt={`upload-${index}`}
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        {/* ✅ اسم المنتج */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="title">
            Product Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none py-2.5 px-3 rounded border border-gray-400/50"
            required
          />
        </div>

        {/* ✅ الوصف */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="desc">
            Product Description
          </label>
          <textarea
            id="desc"
            name="desc"
            rows={4}
            value={form.desc}
            onChange={handleChange}
            className="outline-none py-2.5 px-3 rounded border border-gray-400/50 resize-none"
            placeholder="Type here"
            required
          ></textarea>
        </div>

        {/* ✅ الفئة */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="outline-none py-2.5 px-3 rounded border border-gray-400/50"
            required
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ الأسعار */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="price">
              Product Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="offerPrice">
              Offer Price
            </label>
            <input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={form.offerPrice || ""}
              onChange={handleChange}
              placeholder="0"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50"
            />
          </div>
        </div>

        {/* ✅ باقي الحقول */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-base font-medium">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. EVO"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50 w-full"
            />
          </div>

          <div>
            <label className="text-base font-medium">Stock</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
              type="number"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50 w-full"
            />
          </div>

          <div>
            <label className="text-base font-medium">Rating</label>
            <input
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="0-5"
              type="number"
              step="0.1"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50 w-full"
            />
          </div>

          <div>
            <label className="text-base font-medium">Number of Reviews</label>
            <input
              name="numReviews"
              value={form.numReviews}
              onChange={handleChange}
              placeholder="0"
              type="number"
              className="outline-none py-2.5 px-3 rounded border border-gray-400/50 w-full"
            />
          </div>
        </div>

        {/* ✅ checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          <span className="text-base">Featured Product</span>
        </label>

        {/* ✅ زر الإرسال */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 px-8 py-2.5 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition"
        >
          {submitting ? "Adding..." : "ADD PRODUCT"}
        </button>

        {/* ✅ رسالة النتيجة */}
        {msg && (
          <p
            className={`text-center mt-4 text-sm ${
              msg.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
