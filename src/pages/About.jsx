import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaGlobe,
  FaBullseye,
  FaUserShield,
} from "react-icons/fa";
import { MdSecurity, MdWarning } from "react-icons/md";

export default function About() {
  return (
    <section className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-6 py-24 overflow-hidden">

      {/* ===== HERO ===== */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-cyan-400 mb-4"
          animate={{
            textShadow: [
              "0 0 10px rgba(34,211,238,0.3)",
              "0 0 20px rgba(34,211,238,0.6)",
              "0 0 10px rgba(34,211,238,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          About PhishShield
        </motion.h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          PhishShield is built to defend people from invisible cyber threats.
          Our mission is to make email security simple, fast, and accessible for everyone.
        </p>
      </motion.div>


      {/* ===== STORY ===== */}
      <motion.div
        className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
      >
        <StoryCard title="The Problem" icon={<MdWarning />}>
          Millions fall victim to phishing emails every day.
          Fake websites and malicious attachments destroy trust and steal data.
        </StoryCard>

        <StoryCard title="Our Solution" icon={<FaShieldAlt />}>
          PhishShield analyzes emails in seconds to detect threats
          before damage happens — smart protection without complexity.
        </StoryCard>

        <StoryCard title="Privacy First" icon={<FaLock />}>
          Zero storage. Zero tracking. Zero data retention.
          Your scans exist only for analysis — then disappear forever.
        </StoryCard>

        <StoryCard title="Built for Everyone" icon={<FaGlobe />}>
          No setup required. No expertise needed.
          Paste, scan, stay safe — cybersecurity for everyone.
        </StoryCard>
      </motion.div>


      {/* ===== MISSION ===== */}
      <motion.div
        className="max-w-5xl mx-auto mt-20 bg-black/70 border border-cyan-400/20 rounded-2xl p-10 text-center shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <FaBullseye className="text-cyan-400 text-4xl mx-auto mb-4" />
        </motion.div>

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Our Mission
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We believe cybersecurity should not be complicated.
          PhishShield is built to protect instantly — without ads,
          accounts or privacy invasion.
        </p>
      </motion.div>


      {/* ===== VALUES ===== */}
      <motion.div
        className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
      >
        <Value icon={<FaBolt />} label="Fast" desc="Instant scanning" />
        <Value icon={<MdSecurity />} label="Secure" desc="Safe analysis" />
        <Value icon={<FaUserShield />} label="Private" desc="Data never saved" />
        <Value icon={<FaBullseye />} label="Accurate" desc="Smart detection" />
      </motion.div>

    </section>
  );
}


/* ===== STORY CARD ===== */
const StoryCard = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}   // ✅ MOBILE TAP EFFECT
    viewport={{ once: true }}
    className="group bg-black/70 border border-white/10 rounded-xl p-8 backdrop-blur-lg shadow-xl hover:border-cyan-400/50 transition-all"
  >
    <motion.div
      className="text-cyan-400 text-4xl mb-4"
      animate={{ y: [0, -3, 0] }}   // ✅ FLOATING ANIMATION
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {icon}
    </motion.div>

    <h3 className="text-cyan-300 text-xl font-semibold mb-2">
      {title}
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed">
      {children}
    </p>
  </motion.div>
);


/* ===== VALUE ===== */
const Value = ({ icon, label, desc }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}     // ✅ MOBILE SUPPORT
    viewport={{ once: true }}
    className="bg-black/60 border border-white/10 rounded-xl p-6 text-center shadow-lg hover:border-cyan-400/50 transition"
  >
    <motion.div
      className="text-cyan-400 text-3xl mb-2"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      {icon}
    </motion.div>

    <h4 className="text-white font-semibold">{label}</h4>

    <p className="text-gray-400 text-sm mt-1">
      {desc}
    </p>
  </motion.div>
);
