import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const EditDeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");


  const navigate = useNavigate();
  // ✅ جلب المنتجات
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://my-app-bacg-end.vercel.app/products/getProduct");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("❌ حدث خطأ أثناء تحميل المنتجات. تأكد من اتصال السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ تأكيد الحذف
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  // ✅ حذف المنتج فعلياً
  const handleDelete = async () => {
    if (!productToDelete) return;
    
    try {
      setDeleteLoading(true);
      await axios.delete(`https://my-app-bacg-end.vercel.app/products/${productToDelete._id}`);
      
      setShowConfirm(false);
      setProductToDelete(null);
      
      // إشعار نجاح
      setTimeout(() => {
        getProducts();
      }, 500);
      
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("❌ فشل حذف المنتج. تأكد من تشغيل السيرفر.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ✅ فلترة المنتجات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ جلب التصنيفات الفريدة
  const categories = ["all", ...new Set(products.map(p => p.category?.name).filter(Boolean))];

  // ✅ حالة التحميل المحسنة
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">جاري تحميل المنتجات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔹 الهيدر */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إدارة المنتجات
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            قم بإدارة منتجاتك - تعديل، حذف، أو استعراض جميع المنتجات في متجرك
          </p>
        </div>

        {/* 🔹 إشعار الخطأ */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* 🔹 أدوات البحث والتصفية */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* حقل البحث */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* تصفية حسب التصنيف */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "جميع التصنيفات" : category}
                </option>
              ))}
            </select>

            {/* إحصائيات */}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <span className="text-sm text-gray-600">عدد المنتجات: </span>
              <span className="font-semibold text-indigo-600">{filteredProducts.length}</span>
            </div>
          </div>
        </div>

        {/* 🔹 جدول المنتجات */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 text-gray-300">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {products.length === 0 ? "لا توجد منتجات" : "لم يتم العثور على منتجات"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {products.length === 0 
                  ? "ابدأ بإضافة منتجات جديدة إلى متجرك" 
                  : "جرب البحث بكلمات أخرى أو تغيير التصنيف"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المنتج</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">التصنيف</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">السعر</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الحالة</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr 
                      key={product._id}
                      className="hover:bg-gray-50 transition-all duration-150 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <img
                            src={product.images?.[0] || "/placeholder-image.jpg"}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category?.name || "بدون تصنيف"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.isFeatured 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {product.isFeatured ? "مميز" : "عادي"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <button
                            className="inline-flex items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all duration-200 hover:shadow-sm group/btn"
                            onClick={() => navigate(`/Dashboard/edit/${product._id}`)}
                          >
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            تعديل
                          </button>
                          <button
                            className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-200 hover:shadow-sm group/btn"
                            onClick={() => confirmDelete(product)}
                          >
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 نافذة تأكيد الحذف */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-gray-200 transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                تأكيد الحذف
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                هل أنت متأكد من رغبتك في حذف المنتج 
                <span className="font-semibold text-gray-900"> "{productToDelete?.title}" </span>؟
                <br />
                هذا الإجراء لا يمكن التراجع عنه.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                  onClick={() => {
                    setShowConfirm(false);
                    setProductToDelete(null);
                  }}
                >
                  إلغاء
                </button>
                
                <button
                  type="button"
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  onClick={handleDelete}
                >
                  {deleteLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الحذف...
                    </>
                  ) : (
                    "تأكيد الحذف"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeleteProduct;