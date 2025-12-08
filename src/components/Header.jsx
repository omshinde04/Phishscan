import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaRobot,
  FaBug,
  FaTerminal,
  FaCheckCircle,
  FaLock,
  FaChartLine,
  FaUserSecret,
} from "react-icons/fa";

export default function Header() {
  const phrases = [
    "Scanning email headers...",
    "Verifying authentication...",
    "Checking domain reliability...",
    "Analyzing phishing behavior...",
    "Detecting hidden threats...",
    "Final security verdict ready."
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let char = 0;
    const typing = setInterval(() => {
      setText(phrases[index].slice(0, char + 1));
      char++;
      if (char === phrases[index].length) {
        clearInterval(typing);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % phrases.length);
          setText("");
        }, 1200);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <header className="relative min-h-screen pt-24 md:pt-28 flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="md:hidden absolute inset-0 bg-[url('/images/mobile.jpg')] bg-cover bg-center" />
      <div className="hidden md:block absolute inset-0 bg-[url('/images/desk.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80"></div>

      {/* DIGITAL NOISE */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

      {/* GLOW GRID */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_65%)]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* CONTENT WRAPPER */}
      <div className="relative z-20 max-w-7xl w-full px-5 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >

          {/* STATUS TAG */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 cyan", "0 0 20px cyan", "0 0 0 cyan"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-400 text-cyan-300 text-sm"
          >
            <FaShieldAlt /> AI Protection Enabled
          </motion.div>

          {/* TITLE */}
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold text-cyan-400 leading-tight">
            Email Security
            <br />
            Reinvented
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 text-gray-300 max-w-xl leading-relaxed">
            Detect phishing emails, malicious
            attachments and dangerous links using real-time cyber intelligence.
            No storage. No limits. No tracking.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#scan-section" className="px-8 py-4 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition">
              🚀 Start Scan Now
            </a>
            <a href="/how-it-works" className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
              Learn How It Works
            </a>
          </div>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <Stat value="99.8%" label="Threat Accuracy" />
            <Stat value="0%" label="Data Stored" />
            <Stat value="2s" label="Scan Speed" />
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-black/70 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl overflow-hidden"
        >

          {/* TERMINAL BAR */}
          <div className="flex justify-between items-center bg-black px-4 py-2 text-xs border-b border-white/10">
            <span>phishshield.ai</span>
            <FaTerminal />
          </div>

          {/* TERMINAL BODY */}
          <div className="p-4 font-mono text-sm">

            <Line icon={<FaBug className="text-red-400" />} text="Suspicious payload detected" />
            <Line icon={<FaRobot className="text-cyan-400" />} text="AI Engine Activated" />
            <Line icon={<FaLock className="text-green-400" />} text="Email Authentication Verified" />
            <Line icon={<FaCheckCircle className="text-green-400" />} text="Headers validated successfully" />

            <motion.p
              className="text-green-400 mt-2"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {text}_
            </motion.p>

          </div>

        </motion.div>
      </div>


      {/* FLOATING ROBOT */}
      <motion.div
        className="absolute bottom-10 right-10 text-6xl opacity-20 text-cyan-400 hidden md:block"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <FaRobot />
      </motion.div>

    </header>
  );
}

/* SMALL COMPONENTS */

const Line = ({ icon, text }) => (
  <p className="text-cyan-300 flex items-center gap-2">
    {icon} {text}
  </p>
);

const Stat = ({ value, label }) => (
  <div className="bg-black/60 p-3 rounded-lg border border-white/10">
    <p className="text-cyan-400 text-lg font-bold">{value}</p>
    <p className="text-gray-400 text-xs">{label}</p>
  </div>
);
