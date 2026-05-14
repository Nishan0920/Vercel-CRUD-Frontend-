import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isshow, setIsShow] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-400 w-full">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 font-bold text-2xl text-blue-600">
            <Link to={"/"}>123 GO</Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsShow(!isshow)}
              className="outline-none text-gray-700 text-2xl"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isshow ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {isshow && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t shadow-xl z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to={"/"}
              className="text-gray-700 font-semibold hover:text-blue-600"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
