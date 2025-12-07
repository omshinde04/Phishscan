import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="min-h-screen bg-linearfrom-black to-gray-900 text-white px-6 py-24 overflow-hidden">

      {/* HERO */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-400 mb-4">
          About PhishShield
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          PhishShield is built to defend people from invisible cyber threats.
          Our mission is to make email security simple, fast, and accessible for everyone.
        </p>
      </motion.div>


      {/* STORY SECTION */}
      <motion.div
        className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >

        <StoryCard
          title="The Problem"
          icon="⚠"
        >
          Every day, millions of people fall victim to phishing emails,
          fake websites and malicious attachments. Most scams look real.
          One wrong click can lead to identity theft or financial loss.
        </StoryCard>

        <StoryCard
          title="Our Solution"
          icon="🛡"
        >
          PhishShield analyzes emails using intelligent detection techniques
          to identify threats in seconds — before you click, download or reply.
        </StoryCard>

        <StoryCard
          title="Privacy First"
          icon="🔐"
        >
          We process scans temporarily and never collect data.
          No storage. No history. No tracking. Security should never cost privacy.
        </StoryCard>

        <StoryCard
          title="Built for Everyone"
          icon="🌍"
        >
          You don't need technical knowledge.
          Just paste your email and scan. PhishShield does the rest in one click.
        </StoryCard>

      </motion.div>


      {/* MISSION BLOCK */}
      <motion.div
        className="max-w-5xl mx-auto mt-20 bg-black/70 border border-cyan-400/20 rounded-2xl p-10 text-center shadow-2xl backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Our Mission</h2>

        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We believe cybersecurity should not be complicated.
          Our vision is to build tools that protect users instantly,
          without learning curves, ads or data collection.
        </p>

      </motion.div>


      {/* CORE VALUES */}
      <motion.div
        className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >

        <Value icon="⚡" label="Fast" desc="Instant scan results" />
        <Value icon="🔒" label="Secure" desc="Protected processing" />
        <Value icon="🚫" label="Private" desc="No data storage" />
        <Value icon="🎯" label="Accurate" desc="Threat detection logic" />

      </motion.div>

    </section>
  );
}


/* 🔹 STORY CARD */
const StoryCard = ({ icon, title, children }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-black/70 border border-white/10 rounded-xl p-8 backdrop-blur-lg shadow-xl"
  >

    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-cyan-300 text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      {children}
    </p>

  </motion.div>
);


/* 🔹 VALUE BLOCK */
const Value = ({ icon, label, desc }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="bg-black/60 border border-white/10 rounded-xl p-6 text-center shadow-lg"
  >

    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="text-white font-semibold">{label}</h4>
    <p className="text-gray-400 text-sm mt-1">{desc}</p>

  </motion.div>
);
