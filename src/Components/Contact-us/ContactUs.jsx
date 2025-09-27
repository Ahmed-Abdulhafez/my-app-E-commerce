import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* العنوان */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          sed quaerat aperiam quis quidem. Voluptate!
        </p>
      </div>

      {/* المحتوى */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* فورم التواصل */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* بيانات التواصل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Store Location:</h3>
            <p className="text-gray-600">
              Sunny Isles Beach, FL 33160, United States
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Phone:</h3>
            <p className="text-gray-600">010-020-0340</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Office Location:</h3>
            <p className="text-gray-600">North Miami Beach</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Work Hours:</h3>
            <p className="text-gray-600">07:30 AM - 9:30 PM Daily</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Email:</h3>
            <p className="text-gray-600">info@company.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Social Media:</h3>
            <p className="text-gray-600">
              Facebook, Instagram, Behance, Linkedin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
