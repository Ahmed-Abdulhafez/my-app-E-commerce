import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    brand: "",
    category: "",
    isFeatured: false,
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  // ✅ دالة لتغيير البيانات في الفورم
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ الفئات المسبقة
  <select name="category" value={formData.category} onChange={handleChange}>
    <option value="">اختر الفئة</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>;

  // ✅ تحميل بيانات المنتج
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 🟢 1. جلب بيانات المنتج
        const productRes = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        const product = productRes.data;

        // 🟢 2. جلب الفئات من السيرفر (يفضل بدلاً من كتابة predefinedCategories يدويًا)
        const categoryRes = await axios.get(
          "http://localhost:5000/category/getCategory"
        );
        setCategories(categoryRes.data);

        // 🟢 3. تحديد الـ category بالـ _id وليس الاسم
        setFormData({
          title: product.title || "",
          desc: product.desc || "",
          price: product.price || "",
          brand: product.brand || "",
          category: product.category?._id || "", // ✅ هنا التغيير
          isFeatured: product.isFeatured || false,
        });

        setPreviews(product.images || []);
      } catch (err) {
        console.error("❌ Error loading product:", err);
        setErrors({ fetch: "❌ حدث خطأ أثناء تحميل بيانات المنتج" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ معالجة تحميل الصور
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previews.length > 5) {
      setErrors((prev) => ({ ...prev, images: "يمكنك رفع 5 صور كحد أقصى" }));
      return;
    }

    const newImages = [];
    const newPreviews = [];

    files.forEach((file) => {
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages((prev) => [...prev, ...newImages]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  // ✅ حذف صورة
  const removeImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedImages = images.filter((_, i) => i !== index);

    setPreviews(updatedPreviews);
    setImages(updatedImages);
  };

  // ✅ التحقق من الصحة
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "اسم المنتج مطلوب";
    if (!formData.desc.trim()) newErrors.desc = "وصف المنتج مطلوب";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "السعر يجب أن يكون أكبر من الصفر";
    if (!formData.category) newErrors.category = "الفئة مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ تحديث المنتج
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setUpdating(true);

      let updatedImages = previews; // الصور القديمة

      // ✅ لو المستخدم رفع صور جديدة، ارفعها على Cloudinary
      if (images.length > 0) {
        const uploadedUrls = [];
        for (const file of images) {
          if (!file) {
            console.error("🚫 الملف غير موجود أثناء الرفع!");
            continue;
          }

          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "uploaded_products");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dns30dauk/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const uploadRes = await res.json();

          if (uploadRes.secure_url) {
            uploadedUrls.push(uploadRes.secure_url);
          } else {
            console.error("⚠️ فشل رفع الصورة:", uploadRes);
          }

          uploadedUrls.push(uploadRes.secure_url);
        }

        // ✅ إذا تم رفع صور جديدة، استخدم روابطها بدل القديمة
        if (uploadedUrls.length > 0) {
          updatedImages = uploadedUrls;
        }
      }

      // 🟢 إرسال البيانات إلى السيرفر
      const updatedProduct = {
        ...formData,
        images: updatedImages,
        category: formData.category._id || formData.category,
      };

      const res = await axios.put(
        `http://localhost:5000/products/${id}`,
        updatedProduct
      );

      if (res.status === 200) {
        alert("✅ تم تحديث المنتج بنجاح!");
        navigate("/Dashboard/All-Products");
      }
    } catch (err) {
      console.error("❌ خطأ أثناء تعديل المنتج:", err);
      alert("حدث خطأ أثناء تحديث المنتج. تحقق من الكونسول لمعرفة التفاصيل.");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">
            جاري تحميل بيانات المنتج...
          </h3>
          <p className="text-gray-500 mt-2">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 🔹 رأس الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            تعديل المنتج
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            قم بتعديل معلومات المنتج وتحديثها في متجرك
          </p>
        </div>

        {/* 🔹 إشعار الخطأ العام */}
        {errors.fetch && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-800">{errors.fetch}</span>
            </div>
            <button
              onClick={() => navigate("/Dashboard/All-Products")}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
            >
              العودة
            </button>
          </div>
        )}

        {/* 🔹 نموذج التعديل */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleUpdate} className="p-6 md:p-8">
            {/* 🔹 إشعار النجاح أو الخطأ */}
            {errors.submit && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-800">{errors.submit}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 🔹 اسم المنتج */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المنتج *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="أدخل اسم المنتج"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* 🔹 الوصف */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف المنتج *
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    errors.desc ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="أدخل وصفاً مفصلاً للمنتج"
                />
                {errors.desc && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.desc}
                  </p>
                )}
              </div>

              {/* 🔹 السعر */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السعر ($) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </div>
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.price}
                  </p>
                )}
              </div>

              {/* 🔹 العلامة التجارية */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العلامة التجارية
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="اسم العلامة التجارية"
                />
              </div>

              {/* 🔹 الفئة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.category}
                  </p>
                )}
              </div>

              {/* 🔹 منتج مميز */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  وضع مميز للمنتج
                </label>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  مميز
                </span>
              </div>

              {/* 🔹 تحميل الصور */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صور المنتج ({previews.length}/5)
                </label>

                {/* معاينة الصور */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* زر تحميل الصور */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 mb-1">
                      انقر لرفع الصور أو اسحبها هنا
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, JPEG (5 صور كحد أقصى)
                    </span>
                  </label>
                </div>
                {errors.images && (
                  <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
              </div>
            </div>

            {/* 🔹 أزرار التنفيذ */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 mt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/Dashboard/All-Products")}
                disabled={updating}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 ml-2"
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
                إلغاء
              </button>

              <button
                type="submit"
                disabled={updating}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg shadow-indigo-200"
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 ml-2"
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
                    حفظ التعديلات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
