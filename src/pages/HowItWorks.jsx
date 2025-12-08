import { motion } from "framer-motion";
import {
  MdEmail,
  MdSecurity,
  MdAssessment,
  MdVerified,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FaShieldAlt, FaRobot } from "react-icons/fa";
import { useState } from "react";

/* ========================================================= */
/* MAIN PAGE */
/* ========================================================= */

export default function HowItWorks() {
  return (
    <section className="relative min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-6 py-24 overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_70%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-24">


        {/* HERO */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-cyan-400"
            animate={{
              textShadow: [
                "0 0 8px rgba(34,211,238,0.3)",
                "0 0 18px rgba(34,211,238,0.6)",
                "0 0 8px rgba(34,211,238,0.3)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            How PhishShield Works
          </motion.h1>

          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Real-time email threat detection powered by security intelligence.
          </p>
        </motion.div>


        {/* STEP FLOW */}
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          <Step i={1} icon={<MdEmail />} title="Paste Email" text="Copy or upload content & files." />
          <Step i={2} icon={<MdSecurity />} title="Scan Risk" text="Headers, domains & traps detected." />
          <Step i={3} icon={<MdAssessment />} title="Calculate" text="Threat score is generated." />
          <Step i={4} icon={<MdVerified />} title="Result" text="Clear safety decision." />
        </motion.div>


        {/* AI SHOWCASE */}
        <motion.div
          whileTap={{ scale: 0.97 }}    // ✅ MOBILE TAP
          whileHover={{ scale: 1.03 }}  // ✅ DESKTOP
          className="bg-black/70 rounded-xl border border-cyan-500/40 p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center gap-10"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaRobot className="text-7xl text-cyan-400" />
          </motion.div>

          <div>
            <h2 className="text-cyan-300 font-bold text-lg">
              Cyber Intelligence Engine
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">
              Detects scammers using phishing patterns, forged domains,
              malware fingerprints & behavioral logic.
            </p>
          </div>
        </motion.div>


        {/* ATTACK FLOW */}
        <div>
          <h2 className="text-cyan-300 text-center font-bold text-2xl mb-6">
            Live Attack Simulation
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <Flow label="Fake Email" icon={<MdEmail />} glow="red" />
            <Flow label="Scanner AI" icon={<FaRobot />} glow="yellow" />
            <Flow label="Blocked" icon={<FaShieldAlt />} glow="green" />
          </div>
        </div>


        {/* STATS */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Stat value="99.8%" label="Accuracy" />
          <Stat value="2s" label="Speed" />
          <Stat value="0%" label="Data Stored" />
          <Stat value="Live" label="Protection" />
        </motion.div>


        {/* FAQ */}
        <FAQ />


        {/* PRIVACY */}
        <motion.div
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/70 rounded-xl border border-cyan-400/40 p-6 text-center shadow-lg"
        >
          <FaShieldAlt className="text-cyan-400 text-2xl mx-auto mb-1" />
          <h3 className="text-cyan-300 font-semibold">Zero Tracking Policy</h3>
          <p className="text-gray-400 text-sm">
            Your email never leaves memory — no logs, no storage.
          </p>
        </motion.div>

      </div>
    </section>
  );
}


/* ========================================================= */
/* COMPONENTS */
/* ========================================================= */

const Step = ({ i, icon, title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}   // ✅ MOBILE TOUCH
    viewport={{ once: true }}
    className="bg-black/70 p-6 rounded-xl border border-white/10 shadow-lg"
  >
    <div className="absolute top-4 right-4 text-3xl text-cyan-400 opacity-30">
      {icon}
    </div>
    <span className="bg-cyan-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {i}
    </span>
    <h3 className="mt-3 text-cyan-300 font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm">{text}</p>
  </motion.div>
);


const Flow = ({ label, icon, glow }) => {
  const map = {
    red: "border-red-500 text-red-400 shadow-red-500/30",
    yellow: "border-yellow-400 text-yellow-400 shadow-yellow-400/30",
    green: "border-green-500 text-green-400 shadow-green-500/30",
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.08 }}
      className={`bg-black/70 border ${map[glow]} rounded-xl p-6 shadow-xl text-center`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-4xl mb-2"
      >
        {icon}
      </motion.div>
      <p className="font-bold">{label}</p>
    </motion.div>
  );
};


const Stat = ({ value, label }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    className="bg-black/70 p-5 rounded-xl border border-white/10 text-center"
  >
    <p className="text-cyan-400 text-2xl font-bold">{value}</p>
    <p className="text-gray-400 text-sm mt-1">{label}</p>
  </motion.div>
);


/* ================= FAQ ================= */

const FAQ = () => {
  const faqs = [
    ["Is my email saved?", "No. Everything disappears after scan."],
    ["Is it free?", "Yes. Always free."],
    ["Does it use AI?", "Smart phishing behavior analysis."],
    ["Can files contain malware?", "Yes — we inspect attachments."],
    ["Are links dangerous?", "Often. Many redirect to fakes."],
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-cyan-300 text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map(([q, a], i) => (
          <FAQItem key={i} q={q} a={a} />
        ))}
      </div>
    </div>
  );
};


const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => setOpen(!open)}
      className="bg-black/70 p-4 rounded-xl border border-white/10 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <p className="text-cyan-300 font-semibold">{q}</p>
        <MdOutlineReportProblem className="text-cyan-400" />
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-gray-400 mt-2 text-sm">{a}</p>
      </motion.div>
    </motion.div>
  );
};
