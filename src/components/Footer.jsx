import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full bg-linear-to-b from-black via-gray-900 to-black text-gray-400 overflow-hidden">

      {/* CYBER GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] animate-pulse"></div>

      {/* CONTENT GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-cyan-400">
            <FaShieldAlt /> PhishShield
          </h2>

          <p className="text-sm mt-4 leading-relaxed">
            Advanced email phishing scanner with real-time protection against
            malicious emails, links, and attachments.
          </p>

          <p className="mt-4 text-xs text-gray-500">
            Built for security. Designed for privacy.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <BadgeSecure />
            <BadgeFast />
            <BadgeTrusted />
          </div>
        </div>


        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Access</h3>
          <ul className="space-y-3 text-sm">
            <FooterLink to="/">Scan Email</FooterLink>
            <FooterLink to="/how-it-works">How It Works</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/">Help Center</FooterLink>
          </ul>
        </div>


        {/* SECURITY LIST */}
        <div>
          <h3 className="text-white font-semibold mb-4">Security Engine</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>✔ Email Authentication</li>
            <li>✔ Attachment Scanner</li>
            <li>✔ Phishing Detection</li>
            <li>✔ Header Analysis</li>
            <li>✔ Domain Reputation</li>
          </ul>
        </div>


        {/* TRUST BLOCK */}
        <div>
          <h3 className="text-white font-semibold mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>🔒 No logs stored</li>
            <li>⚡ Fast scan</li>
            <li>🧠 Intelligent analysis</li>
            <li>📡 Real-time engine</li>
            <li>✅ Free forever</li>
          </ul>
        </div>

      </div>


      {/* COPYRIGHT BAR */}
      <motion.div
        className="relative z-10 border-t border-white/10 py-6 px-4 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-400 font-semibold">PhishShield</span> —
        Your Digital Defense Against Scams

        {/* SOCIAL */}
        <div className="mt-4 flex justify-center gap-6 text-xl">
          <SocialIcon icon={<FaGlobe />} />
          <SocialGithub />
          <SocialTwitter />
          <SocialLinkedin />
          <SocialMail />
        </div>
      </motion.div>
    </footer>
  );
}



/* ================================= */
/* BADGES */
/* ================================= */

const BadgeSecure = () => (
  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-green-400 bg-green-600/20 border border-green-400/40">
    <FaLock /> Secure
  </span>
);

const BadgeFast = () => (
  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-blue-400 bg-blue-600/20 border border-blue-400/40">
    <FaBolt /> Fast
  </span>
);

const BadgeTrusted = () => (
  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-purple-400 bg-purple-600/20 border border-purple-400/40">
    <FaShieldAlt /> Trusted
  </span>
);


/* ================================= */
/* LINKS */
/* ================================= */

const FooterLink = ({ to, children }) => (
  <li>
    <NavLink
      to={to}
      className="hover:text-cyan-400 transition duration-300"
    >
      {children}
    </NavLink>
  </li>
);


/* ================================= */
/* SOCIAL ICONS */
/* ================================= */

const SocialIcon = ({ icon }) => (
  <motion.a
    href="#"
    whileHover={{ scale: 1.2, rotate: 5 }}
    className="hover:text-cyan-400 transition"
  >
    {icon}
  </motion.a>
);

const SocialGithub = () => (
  <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-cyan-400">
    <FaGithub />
  </motion.a>
);

const SocialTwitter = () => (
  <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-cyan-400">
    <FaTwitter />
  </motion.a>
);

const SocialLinkedin = () => (
  <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-cyan-400">
    <FaLinkedin />
  </motion.a>
);

const SocialMail = () => (
  <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-cyan-400">
    <FaEnvelope />
  </motion.a>
);
