import React from "react";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white text-gray-600 max-w-lg w-full mx-4 p-8 rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Sign Up
        </h2>

        {/* Username */}
        <div className="flex items-center mb-4 border bg-indigo-50 border-gray-200 rounded-lg gap-2 pl-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path
              d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
              stroke="currentColor"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="w-full outline-none bg-transparent py-3"
            type="text"
            placeholder="Username"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center mb-4 border bg-indigo-50 border-gray-200 rounded-lg gap-2 pl-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="currentColor"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="currentColor"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="w-full outline-none bg-transparent py-3"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-6 border bg-indigo-50 border-gray-200 rounded-lg gap-2 pl-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="currentColor"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="currentColor"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="w-full outline-none bg-transparent py-3"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Button */}
        <button className="w-full mb-4 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-3 rounded-lg text-white font-semibold text-lg">
          Create Account
        </button>

        {/* Login link */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="text-indigo-500 font-medium hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
