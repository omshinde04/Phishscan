import React, { useState, useEffect } from "react";
import {
  HiMenu,
  HiX,
  HiHome,
  HiInformationCircle,
  HiShieldCheck,
  HiDocumentText,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <HiHome size={20} /> },
    { name: "How it Works", href: "/how-it-works", icon: <HiInformationCircle size={20} /> },
    { name: "Privacy", href: "/privacy", icon: <HiShieldCheck size={20} /> },
    { name: "About", href: "/about", icon: <HiDocumentText size={20} /> },
  ];

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-cyan-400 text-2xl font-bold">
          <NavLink to="/">PhishShield</NavLink>
        </motion.div>

        {/* DESKTOP */}
        <ul className="hidden md:flex gap-8 text-white font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-cyan-400" : "hover:text-cyan-300"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
        </ul>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-black/95 py-6"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-center text-lg text-white hover:text-cyan-300"
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
