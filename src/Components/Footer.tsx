import { Link } from "react-router-dom";
import React from "react";

const Footer:React.FC = () => {
  return (
    <div>
      <footer className="bg-white border-t border-black  py-6 mt-20">
        <div className="max-w-8xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
     
          <div className="text-blue-700 text-2xl font-bold ">
             <Link to={"/"}>123 GO</Link>
          </div>

        
          <div className="text-gray-500 text-sm">
            &copy;{new Date().getFullYear()} All rights reserved.
          </div>

        
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to={"/"}
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link
              to={"/"}
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <i className="fa-brands fa-envelope"></i>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
