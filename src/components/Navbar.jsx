import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.length;

  const navLinks = [
    { to: "/products", label: "All" },
    { to: "/clothes", label: "Clothes" },
    { to: "/electronics", label: "Electronics" },
    { to: "/furniture", label: "Furniture" },
    { to: "/toys", label: "Toys" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 tracking-tight"
          >
            Shopi
          </Link>


          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `pb-1 border-b-2 ${isActive
                    ? "border-black text-black"
                    : "border-transparent hover:border-black hover:text-black"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>


          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            {user && (
              <span className="text-gray-500 truncate max-w-[150px]">
                {user.email}
              </span>
            )}
            <NavLink to="/orders" className="hover:text-black transition-colors">
              My Orders
            </NavLink>
            <NavLink to="/account" className="hover:text-black transition-colors">
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

            {user && (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs transition"
              >
                Logout
              </button>
            )}
          </div>


          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-start px-6 py-4 space-y-4 text-gray-700 font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full ${isActive ? "text-black font-semibold" : "hover:text-black"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="hover:text-black"
            >
              My Orders
            </NavLink>
            <NavLink
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="hover:text-black"
            >
              My Account
            </NavLink>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center gap-2 hover:text-black"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm w-full text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
