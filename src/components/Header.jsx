import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">

      {/* BACKGROUND IMAGES (UNCHANGED) */}
      <div className="md:hidden absolute inset-0 w-full h-full bg-[url('/images/mobile.jpg')] bg-cover bg-center"></div>
      <div className="hidden md:block absolute inset-0 w-full h-full bg-[url('/images/desk.jpg')] bg-cover bg-center"></div>

      {/* CYBER DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* GLOW RADIAL LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_60%)]"></div>

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-10 max-w-6xl px-4 sm:px-6 md:px-12 py-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        {/* TOP BADGE */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/20 border border-cyan-400/40 text-cyan-300 text-sm backdrop-blur-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🛡 Cyber AI Protection Enabled
        </motion.div>

        {/* HEADING */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-cyan-400 drop-shadow-xl"
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
        >
          Protect Your Inbox{" "}
          <span className="text-white">Like a Pro</span>
        </motion.h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-gray-200 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed">
          Analyze emails, scan attachments and detect phishing threats in real-time using
          intelligent cyber security algorithms — no signup required, forever free.
        </p>

        {/* CTA */}
        <motion.div className="mt-10 flex flex-col sm:flex-row gap-5">
          <a
            href="#scan-section"
            className="px-10 py-4 bg-cyan-500 text-black font-bold rounded-full shadow-xl hover:bg-cyan-400 transition"
          >
            🔍 Scan Email Now
          </a>
          <a
            href="#learn-more"
            className="px-10 py-4 border border-white/40 text-white rounded-full hover:bg-white/10 transition"
          >
            📘 Learn How It Works
          </a>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Feature title="Phishing AI Detection" icon="🎯" desc="Detect malicious senders instantly using security intelligence." />
          <Feature title="Attachment Analysis" icon="📁" desc="Scan documents and images for hidden malware threats." />
          <Feature title="Link Verification" icon="🌐" desc="Check links before clicking and avoid trap websites." />
        </motion.div>

      </motion.div>

      {/* FLOATING ICONS */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
        alt="Email"
        className="absolute bottom-10 left-6 w-14 opacity-40"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3187/3187480.png"
        alt="Attachment"
        className="absolute top-20 right-8 w-14 opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </header>
  );
};

export default Header;

const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover="hover"
    whileTap="tap"
    variants={{
      hover: { scale: 1.08, y: -6 },
      tap: { scale: 0.96 },
    }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="group relative bg-black/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 text-center
               cursor-pointer overflow-hidden shadow-xl
               transition-all duration-300"
  >

    {/* MOBILE SAFE GLOW LAYER */}
    <motion.div
      variants={{
        hover: { opacity: 1 },
        tap: { opacity: 0.8 }
      }}
      className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_70%)]
                 opacity-0 transition pointer-events-none"
    />

    {/* CONTENT */}
    <div className="relative z-10">
      <motion.div
        variants={{
          hover: { scale: 1.15 },
          tap: { scale: 0.9 }
        }}
        className="text-4xl mb-2 transition"
      >
        {icon}
      </motion.div>

      <motion.h3
        variants={{ hover: { color: "#22d3ee" } }}
        className="mt-2 text-white font-semibold text-lg transition"
      >
        {title}
      </motion.h3>

      <motion.p
        variants={{ hover: { color: "#e5e7eb" } }}
        className="mt-1 text-sm text-gray-400"
      >
        {desc}
      </motion.p>
    </div>

    {/* GLOW BORDER */}
    <motion.span
      variants={{ hover: { opacity: 1 } }}
      className="absolute inset-0 rounded-xl border border-cyan-400/30
                 opacity-0 pointer-events-none transition"
    />
  </motion.div>
);

