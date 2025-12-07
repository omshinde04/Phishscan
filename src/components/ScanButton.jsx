import React from "react";
import { motion } from "framer-motion";

const ScanButton = ({ children, ...props }) => {
  return (
    <motion.button
      {...props}
      className="bg-cyan-400 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-500 hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default ScanButton;
