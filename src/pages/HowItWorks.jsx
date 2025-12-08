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

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_65%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-24">


        {/* HERO TITLE */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow">
            How PhishShield Works
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3">
            Modern email protection powered by cyber intelligence.
          </p>
        </motion.div>


        {/* STEP FLOW */}
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Step i={1} icon={<MdEmail />} title="Paste Email" text="Upload or paste email content and attachment." />
          <Step i={2} icon={<MdSecurity />} title="Scan Risk" text="Domains, headers & language analyzed." />
          <Step i={3} icon={<MdAssessment />} title="Calculate" text="Risk algorithm generates threat level." />
          <Step i={4} icon={<MdVerified />} title="Result" text="Final decision with safety guidance." />
        </motion.div>


        {/* AI ENGINE SHOWCASE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-black/60 backdrop-blur-xl rounded-xl border border-cyan-500/40 p-8 flex flex-col md:flex-row items-center gap-10 shadow-2xl hover:shadow-cyan-500/20 transition"
        >
          <FaRobot className="text-7xl text-cyan-400 animate-pulse drop-shadow" />
          <div>
            <h2 className="text-xl font-bold text-cyan-300">
              Cyber Intelligence Engine
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Multi-layer logic engine analyzes phishing indicators including:
              spoofing, malicious URLs, social engineering traps & file exploits.
            </p>
          </div>
        </motion.div>


        {/* ATTACK SIMULATION */}
        <div>
          <h2 className="text-2xl text-cyan-300 text-center font-bold mb-6">
            Live Attack Flow
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <Flow label="Fake Email" icon={<MdEmail />} glow="red" />
            <Flow label="Scanner AI" icon={<FaRobot />} glow="yellow" />
            <Flow label="Blocked" icon={<FaShieldAlt />} glow="green" />
          </div>
        </div>


        {/* STATS */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Stat value="99.8%" label="Accuracy" />
          <Stat value="2 sec" label="Scan Speed" />
          <Stat value="0 Logs" label="Privacy Risk" />
          <Stat value="Live" label="Threat Monitor" />
        </motion.div>


        {/* FAQ */}
        <FAQ />


        {/* PRIVACY BADGE */}
        <motion.div
          className="bg-black/70 rounded-xl border border-cyan-400/40 p-6 text-center shadow-xl hover:shadow-cyan-400/20 transition"
          whileHover={{ scale: 1.02 }}
        >
          <FaShieldAlt className="text-2xl text-cyan-400 mx-auto mb-1" />
          <h3 className="text-cyan-300 font-semibold">Privacy by Design</h3>
          <p className="text-gray-400 text-sm">
            Zero storage. Zero tracking. Complete trust.
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
    whileHover={{ y: -10, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-black/60 rounded-xl p-6 border border-white/10 shadow-lg hover:border-cyan-400/50 relative backdrop-blur"
  >
    <div className="absolute top-4 right-4 text-4xl text-cyan-400 opacity-40">
      {icon}
    </div>
    <span className="bg-cyan-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {i}
    </span>
    <h3 className="mt-4 text-cyan-300 font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm mt-1">{text}</p>
  </motion.div>
);


const Flow = ({ label, icon, glow }) => {
  const glowMap = {
    red: "shadow-red-500/30 border-red-500 text-red-400",
    yellow: "shadow-yellow-400/30 border-yellow-400 text-yellow-400",
    green: "shadow-green-400/30 border-green-500 text-green-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-black/70 border ${glowMap[glow]} rounded-xl p-6 text-center shadow-xl transition`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="font-bold">{label}</p>
    </motion.div>
  );
};


const Stat = ({ value, label }) => (
  <div className="bg-black/70 p-5 rounded-xl border border-white/10 shadow-lg hover:border-cyan-400/40 transition">
    <p className="text-2xl text-cyan-400 font-bold">{value}</p>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);


/* ================= FAQ SECTION ================= */

const FAQ = () => {
  const faqs = [
    ["Is my email saved?", "No. Your emails are deleted instantly after scan."],
    ["Is it really free?", "Yes. No account, no fees, no limits."],
    ["Does it use AI?", "We use behavioral detection intelligence models."],
    ["Can attachments contain viruses?", "Yes. We scan for malware signatures."],
    ["Can links be fake?", "Yes. Redirect chains are commonly abused."],
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl text-cyan-300 font-bold text-center mb-6">
        FAQ
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
      onClick={() => setOpen(!open)}
      className="bg-black/70 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-cyan-400/50 transition"
    >
      <div className="flex justify-between items-center">
        <p className="text-cyan-300 font-semibold">{q}</p>
        <MdOutlineReportProblem className="text-cyan-400 text-xl" />
      </div>
      <Animate expand={open}>
        <p className="text-gray-400 text-sm mt-2">{a}</p>
      </Animate>
    </motion.div>
  );
};


const Animate = ({ expand, children }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: expand ? "auto" : 0, opacity: expand ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden"
  >
    {children}
  </motion.div>
);
