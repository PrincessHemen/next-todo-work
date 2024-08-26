import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <h1 className="text-2xl font-bold">ToDo App</h1>
        <ul className="flex flex-wrap gap-4 text-base md:gap-6 md:text-lg">
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            Home
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            Products
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            About
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
