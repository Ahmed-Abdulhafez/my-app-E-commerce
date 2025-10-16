import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", path: "/Dashboard", icon: "📊" },
    { name: "All Products", path: "/Dashboard/All-Products", icon: "📦" },
    { name: "Add Product", path: "/Dashboard/Add-Product", icon: "➕" },
    { name: "Edit / Delete", path: "/Dashboard/Edit-Delete", icon: "✏️" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* 🔹 Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔹 الشريط الجانبي الثابت */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg border-r border-gray-200 
        flex flex-col justify-between transition-transform duration-300 z-30
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* الشعار */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600 tracking-wide">
            Admin Panel
          </h1>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>

        {/* ✅ روابط القائمة (قابلة للتمرير داخل الناف فقط) */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:shadow-sm"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* زر تسجيل الخروج */}
        <div className="border-t border-gray-200 p-4">
          <button className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-500 hover:bg-red-600 text-white py-3 transition-all duration-200 shadow-md hover:shadow-lg">
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 🔹 المحتوى الرئيسي */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* الهيدر */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 py-4 lg:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                Welcome, Admin 👋
              </h2>
              <p className="text-sm text-gray-500 hidden sm:block">
                Manage your store efficiently
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              A
            </div>
          </div>
        </header>

        {/* ✅ منطقة عرض الصفحات الفرعية - يمكن تمريرها بحرية */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
