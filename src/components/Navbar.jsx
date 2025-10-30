import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.length;
  return (
    <nav className="w-full flex justify-between items-center px-10 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-semibold text-gray-800 tracking-tight"
      >
        Shopi
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive
                ? "border-black text-black"
                : "border-transparent hover:border-black hover:text-black"
            }`
          }
        >
          All
        </NavLink>
        <NavLink
          to="/clothes"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive
                ? "border-black text-black"
                : "border-transparent hover:border-black hover:text-black"
            }`
          }
        >
          Clothes
        </NavLink>
        <NavLink
          to="/electronics"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive
                ? "border-black text-black"
                : "border-transparent hover:border-black hover:text-black"
            }`
          }
        >
          Electronics
        </NavLink>
        <NavLink
          to="/furniture"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive
                ? "border-black text-black"
                : "border-transparent hover:border-black hover:text-black"
            }`
          }
        >
          Furniture
        </NavLink>
        <NavLink
          to="/toys"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive
                ? "border-black text-black"
                : "border-transparent hover:border-black hover:text-black"
            }`
          }
        >
          Toys
        </NavLink>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-700">
        <span className="hidden md:block text-gray-500">
          userintheapp@test.com
        </span>
        <NavLink
          to="/orders"
          className="hover:text-black transition-colors"
        >
          My Orders
        </NavLink>
        <NavLink
          to="/account"
          className="hover:text-black transition-colors"
        >
          My Account
        </NavLink>
        <Link
          to="/cart"
          className="relative flex items-center gap-1 hover:text-black transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
