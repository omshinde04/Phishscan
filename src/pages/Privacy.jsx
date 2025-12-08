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
    <section className="relative min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-6 py-24 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_70%)]"></div>

      <div className="relative z-10 max-w-5xl mx-auto">


        {/* TITLE */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-cyan-400"
            animate={{
              textShadow: [
                "0 0 10px rgba(34,211,238,0.2)",
                "0 0 24px rgba(34,211,238,0.5)",
                "0 0 10px rgba(34,211,238,0.2)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Privacy Policy
          </motion.h1>

          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            PhishShield is designed with privacy-first architecture.  
            We protect your emails — not harvest your data.
          </p>
        </motion.div>


        {/* POLICY GRID */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <Policy icon={<FaDatabase />} title="No Data Stored" desc="Scans run in memory only. Nothing is saved." />
          <Policy icon={<FaLock />} title="Encrypted Processing" desc="All traffic is encrypted." />
          <Policy icon={<FaUserShield />} title="Anonymous Usage" desc="No accounts. No identity." />
          <Policy icon={<FaCookieBite />} title="No Tracking" desc="No cookies. No analytics." />
          <Policy icon={<FaMapMarkedAlt />} title="No Location Logs" desc="We never log IPs." />
          <Policy icon={<FaShareAlt />} title="No Sharing" desc="Zero data = nothing to sell." />
          <Policy icon={<FaFileAlt />} title="Temporary Processing" desc="Environments auto-clean." />
          <Policy icon={<FaShieldAlt />} title="Transparency" desc="Privacy-first responsibility." />
        </motion.div>


        {/* PROMISE */}
        <motion.div
          className="mt-20 bg-black/70 border border-cyan-400/30 rounded-xl p-8 text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileTap={{ scale: 0.96 }}   // ✅ TOUCH FEEDBACK
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaShieldAlt className="text-4xl text-cyan-400 mx-auto mb-4" />
          </motion.div>

          <h3 className="text-cyan-300 text-xl font-semibold">
            Our Promise To You
          </h3>

          <p className="text-gray-300 text-sm mt-3 max-w-xl mx-auto">
            Your data never belongs to us — because we never take it.  
            Protection without privacy theft.
          </p>
        </motion.div>

      </div>
    </section>
  );
}



/* ================================================== */
/* POLICY CARD */
/* ================================================== */

const Policy = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileTap={{ scale: 0.96 }}   // ✅ MOBILE TAP
    whileHover={{ scale: 1.05 }} // ✅ DESKTOP
    className="relative bg-black/70 p-6 rounded-xl border border-white/10 shadow-lg overflow-hidden group"
  >

    {/* AUTO GLOW */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: [0.2, 0.6, 0.2] }}
      transition={{ repeat: Infinity, duration: 3 }}
      style={{
        background:
          "radial-gradient(circle at top, rgba(56,189,248,0.15), transparent 70%)",
      }}
    />

    <div className="relative z-10 flex gap-4">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-3xl text-cyan-400"
      >
        {icon}
      </motion.div>

      <div>
        <h3 className="text-cyan-300 font-semibold text-lg">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>

  </motion.div>
);
