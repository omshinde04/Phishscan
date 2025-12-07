import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="min-h-screen bglinearfrom-black to-gray-900 text-white px-6 py-24">

      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* PAGE TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
          How PhishShield Works
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Checking an email is easy. Just follow these four simple steps and stay protected.
        </p>

        {/* STEPS */}
        <div className="grid sm:grid-cols-2 gap-8">

          <Step 
            step="1"
            title="Paste Your Email"
            text="Copy email details such as sender, subject, and content into the form or upload screenshots and files."
            icon="📧"
          />

          <Step
            step="2"
            title="Security Check Starts"
            text="We deeply analyze the email sender, domain, suspicious words, links, and attachments."
            icon="🛡️"
          />

          <Step
            step="3"
            title="Threat Score Generated"
            text="The system gives a risk score based on phishing behaviour and possible dangers."
            icon="⚠️"
          />

          <Step
            step="4"
            title="You Get Final Result"
            text="You’ll see if the email is SAFE, SUSPICIOUS, or DANGEROUS with clear recommendations."
            icon="✅"
          />

        </div>

        {/* TRUST MESSAGE */}
        <motion.div
          className="mt-16 bg-black/60 border border-white/10 rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-cyan-300 text-lg font-semibold mb-2">Your Privacy Comes First</h3>
          <p className="text-gray-400 text-sm">
            We never save your emails or files. Everything is temporary and secure.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}


/* 🔹 STEP CARD */

const Step = ({ step, title, text, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative bg-black/70 p-6 rounded-xl border border-white/10 text-left"
  >

    {/* ICON */}
    <div className="absolute top-4 right-4 text-3xl opacity-30">
      {icon}
    </div>

    {/* STEP NUMBER */}
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-cyan-400 text-black rounded-full w-9 h-9 flex items-center justify-center font-bold">
        {step}
      </span>
      <h3 className="text-lg text-cyan-300 font-semibold">{title}</h3>
    </div>

    {/* DESCRIPTION */}
    <p className="text-gray-400 text-sm">{text}</p>

  </motion.div>
);
