import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-linearfrom-black to-gray-900 text-white px-6 py-24">

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Your privacy matters to us. PhishShield is designed to protect your emails
          without collecting personal information.
        </p>

        {/* POLICIES */}
        <div className="space-y-8">

          <Policy
            icon="🚫"
            title="We Do NOT Store Any Data"
            desc="Nothing you scan is saved. Emails, files, screenshots, and analysis reports
                  are processed temporarily and erased automatically."
          />

          <Policy
            icon="🔐"
            title="Data Is Always Encrypted"
            desc="All email content and attachments are processed in secure environments
                  with encrypted transfers and isolated scanning systems."
          />

          <Policy
            icon="👤"
            title="No Account Needed"
            desc="No sign-up. No profile creation. No login. We don't want your identity —
                  we only scan threats."
          />

          <Policy
            icon="🍪"
            title="No Cookies & No Tracking"
            desc="We do not use tracking tools, analytics services, or advertisements that follow you around."
          />

          <Policy
            icon="📍"
            title="No Location or IP Tracking"
            desc="We do not collect IP addresses or attempt to determine your physical location."
          />

          <Policy
            icon="🧩"
            title="Third-Party Sharing"
            desc="We never sell or share any information with third parties — because we don’t store anything in the first place."
          />

          <Policy
            icon="📜"
            title="Transparency Promise"
            desc="Our system is designed with privacy-first architecture. Everything runs in a temporary environment
                  and auto-cleans after every scan."
          />

        </div>

        {/* TRUST BOX */}
        <motion.div
          className="mt-16 bg-black/60 border border-cyan-400/20 p-6 rounded-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-cyan-300 text-xl font-semibold mb-2">Our Promise to You</h3>
          <p className="text-gray-300 text-sm">
            We built PhishShield to protect people, not data. Your information stays yours —
            always.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}


/* 🔹 POLICY CARD */

const Policy = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative bg-black/70 p-6 rounded-xl border border-white/10"
  >

    <div className="flex gap-4">
      <div className="text-3xl">{icon}</div>

      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>

  </motion.div>
);
