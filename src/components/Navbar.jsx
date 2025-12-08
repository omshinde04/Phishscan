import React, { useState, useEffect } from "react";
import {
  HiMenu,
  HiX,
  HiHome,
  HiInformationCircle,
  HiShieldCheck,
  HiDocumentText,
} from "react-icons/hi";
import { FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <HiHome size={18} /> },
    { name: "How it Works", href: "/how-it-works", icon: <HiInformationCircle size={18} /> },
    { name: "Privacy", href: "/privacy", icon: <HiShieldCheck size={18} /> },
    { name: "About", href: "/about", icon: <HiDocumentText size={18} /> },
  ];

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

        {/* 🛡 LOGO */}
        <motion.div
          whileHover={{ scale: 1.07 }}
          className="flex items-center gap-2 text-cyan-400 text-2xl font-bold tracking-wide"
        >
          <FaShieldAlt className="text-cyan-400 drop-shadow-glow" />
          <NavLink to="/" className="hover:text-cyan-300 transition">
            PhishShield
          </NavLink>
        </motion.div>


        {/* 🖥 DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-white font-medium text-sm">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `group flex items-center gap-2 transition ${
                  isActive ? "text-cyan-400" : "hover:text-cyan-300"
                }`
              }
            >
              <span className="group-hover:scale-110 transition">
                {link.icon}
              </span>
              <span>{link.name}</span>
            </NavLink>
          ))}

        </ul>


        {/* 📱 MOBILE BUTTON */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.85 }}
            className="text-white hover:text-cyan-400 transition"
          >
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </motion.button>
        </div>
      </div>


      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/95 backdrop-blur-lg py-6"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex justify-center items-center gap-2 py-3 text-lg transition ${
                    isActive ? "text-cyan-400" : "hover:text-cyan-300 text-white"
                  }`
                }
              >
                {link.icon}
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
