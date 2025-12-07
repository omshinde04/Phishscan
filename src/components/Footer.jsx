import React from "react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full bg-linear-to-b from-black via-gray-900 to-black text-gray-400 overflow-hidden">

      {/* 🔵 Animated Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)] animate-pulse"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-cyan-400">PhishShield</h2>
          <p className="text-sm mt-3 leading-relaxed">
            Advanced email phishing detection engine that helps you identify
            malicious emails instantly using AI-powered analysis.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Protecting users from cyber attacks in real-time.
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full border border-green-400/30">
              ✅ Secure
            </span>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ Fast
            </span>
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full border border-purple-400/30">
              🛡 Trusted
            </span>
          </div>
        </div>


        {/* LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a className="hover:text-cyan-400 transition" href="#">Scan Email</a></li>
            <li><a className="hover:text-cyan-400 transition" href="#">How It Works</a></li>
            <li><a className="hover:text-cyan-400 transition" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-cyan-400 transition" href="#">Terms & Conditions</a></li>
            <li><a className="hover:text-cyan-400 transition" href="#">Help Center</a></li>
          </ul>
        </div>


        {/* SECURITY */}
        <div>
          <h3 className="text-white font-semibold mb-4">Security Checks</h3>
          <ul className="space-y-3 text-sm">
            <li>✔ Email Authentication</li>
            <li>✔ Attachment Scanning</li>
            <li>✔ Malicious Link Detection</li>
            <li>✔ Header Analysis</li>
            <li>✔ Domain Reputation</li>
          </ul>
        </div>


        {/* TRUST */}
        <div>
          <h3 className="text-white font-semibold mb-4">Why Trust PhishShield?</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>🔒 Zero data storage</li>
            <li>🧠 AI detection engine</li>
            <li>🌐 Live threat updates</li>
            <li>⚠ Real-time alerts</li>
            <li>✅ Compliance-ready</li>
          </ul>
        </div>

      </div>


      {/* LOWER BAR */}
      <motion.div
        className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        © {new Date().getFullYear()} <span className="text-cyan-400">PhishShield</span>
        — Your Digital Shield Against Cyber Threats

        <div className="mt-3 flex justify-center gap-6 text-lg">

          {/* Icon links (emoji for now) */}
          <a href="#" className="hover:text-cyan-400 transition">🌐</a>
          <a href="#" className="hover:text-cyan-400 transition">🐦</a>
          <a href="#" className="hover:text-cyan-400 transition">💼</a>
          <a href="#" className="hover:text-cyan-400 transition">📧</a>

        </div>
      </motion.div>

    </footer>
  )
}
