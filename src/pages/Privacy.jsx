import { motion } from "framer-motion";
import {
  FaDatabase,
  FaLock,
  FaUserShield,
  FaCookieBite,
  FaMapMarkedAlt,
  FaShareAlt,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-6 py-24">

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow">
            Privacy Policy
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4 mb-14">
            PhishShield is built with privacy-first architecture.  
            We protect your emails — not harvest your data.
          </p>
        </motion.div>


        {/* POLICIES */}
        <div className="grid md:grid-cols-2 gap-6">

          <Policy
            icon={<FaDatabase />}
            title="No Data Stored"
            desc="Emails, screenshots or files are never saved. Everything is scanned in memory and deleted instantly."
          />

          <Policy
            icon={<FaLock />}
            title="Encrypted Processing"
            desc="All data passes through secure encrypted channels and isolated scanning systems."
          />

          <Policy
            icon={<FaUserShield />}
            title="Anonymous Usage"
            desc="No login, no signup, no identity tracking. You remain completely anonymous."
          />

          <Policy
            icon={<FaCookieBite />}
            title="No Tracking"
            desc="We don’t use analytics tools, fingerprinting, cookies or advertisements."
          />

          <Policy
            icon={<FaMapMarkedAlt />}
            title="No Location Logs"
            desc="IP addresses and geographic data are never collected."
          />

          <Policy
            icon={<FaShareAlt />}
            title="No Third-Party Sharing"
            desc="Your information is never sold, rented or transferred — because it is never stored."
          />

          <Policy
            icon={<FaFileAlt />}
            title="Temporary Processing"
            desc="All scans run inside auto-cleared environments to avoid residual data."
          />

          <Policy
            icon={<FaShieldAlt />}
            title="Transparency Guarantee"
            desc="We commit to privacy-first development and zero data retention."
          />

        </div>


        {/* PROMISE BOX */}
        <motion.div
          className="mt-16 bg-black/70 border border-cyan-400/30 rounded-xl p-8 text-center shadow-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 0.8 }}
        >
          <FaShieldAlt className="text-4xl text-cyan-400 mx-auto mb-4" />
          <h3 className="text-cyan-300 text-xl font-semibold">
            Our Promise To You
          </h3>
          <p className="text-gray-300 text-sm mt-3 max-w-xl mx-auto">
            Your data never belongs to us — because we never take it.
            PhishShield exists to protect users, not monetize them.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}



/* ================================= */
/* 🔹 POLICY CARD */
/* ================================= */

const Policy = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -4 }}
    transition={{ type: "spring", stiffness: 220 }}
    className="relative bg-black/70 p-6 rounded-xl border border-white/10 shadow-lg hover:border-cyan-400/50 group overflow-hidden"
  >

    {/* GLOW EFFECT */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent_70%)]"></div>

    <div className="relative z-10 flex gap-4">

      <div className="text-3xl text-cyan-400">
        {icon}
      </div>

      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-1">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>
      </div>

    </div>

  </motion.div>
);
