import React from "react"
import { motion } from "framer-motion"


export default function ResultCard({ result = demoResult }) {

  const riskUI = {
    High: {
      badge: "bg-red-600/30 text-red-400 border-red-600",
      bar: "bg-red-500",
      message: "This email is likely a phishing attempt."
    },
    Medium: {
      badge: "bg-yellow-500/30 text-yellow-300 border-yellow-400",
      bar: "bg-yellow-400",
      message: "This email looks suspicious. Review carefully."
    },
    Low: {
      badge: "bg-green-500/30 text-green-400 border-green-400",
      bar: "bg-green-500",
      message: "This email looks safe. No major threats detected."
    }
  }

  const theme = riskUI[result.risk]

  return (
    <section className="w-full py-20 bg-black flex justify-center px-4">
      <motion.div
        className="w-full max-w-4xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >

        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Scan Result
          </h2>

          <span className={`px-5 py-2 rounded-full border text-lg font-semibold tracking-wide ${theme.badge}`}>
            {result.risk} Risk
          </span>
        </div>


        {/* ===== SCORE BAR ===== */}
        <div className="bg-black/60 rounded-xl p-4 mb-6 border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Email Threat Percentage</p>

          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`${theme.bar} h-full transition-all duration-700`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>

          <p className="text-right text-sm text-gray-400 mt-1">
            {result.score}% Risk Level
          </p>
        </div>


        {/* ===== MAIN MESSAGE ===== */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 mb-8">
          <p className="text-gray-300">{theme.message}</p>
        </div>


        {/* ===== DETAILS ===== */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">

          <InfoCard
            title="Sender Check"
            desc="Is this sender trusted?"
            value={result.senderScore}
          />

          <InfoCard
            title="Link Safety"
            desc="Are URLs dangerous?"
            value={result.linkScore}
          />

          <InfoCard
            title="Attachment Scan"
            desc="Are files risky?"
            value={result.attachmentScore}
          />

          <InfoCard
            title="Email Header"
            desc="Authentication status"
            value={result.headerScore}
          />

        </div>


        {/* ===== ISSUES ===== */}
        <div className="bg-black/60 border border-red-500/20 rounded-xl p-4 mb-6">
          <h3 className="text-red-400 font-semibold mb-2">
            Problems Detected
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {result.issues.map((item, i) =>
              <li key={i}>{item}</li>
            )}
          </ul>
        </div>


        {/* ===== ACTION ===== */}
        <div className="bg-black/60 border border-green-500/20 rounded-xl p-4">
          <h3 className="text-green-400 font-semibold mb-1">
            What Should You Do?
          </h3>
          <p className="text-gray-300">
            {result.recommendation}
          </p>
        </div>


      </motion.div>
    </section>
  )
}



function InfoCard({ title, desc, value }) {

  const color =
    value === "Safe" ? "text-green-400" :
    value === "Suspicious" ? "text-yellow-400" :
    "text-red-500"

  const icon =
    value === "Safe" ? "✅" :
    value === "Suspicious" ? "⚠️" :
    "❌"

  return (
    <div className="bg-black/60 border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xs text-gray-500 mb-1">{desc}</p>
      <p className={`text-lg font-semibold ${color}`}>
        {icon} {value}
      </p>
    </div>
  );
}


/* -------- DEMO DATA (FOR NOW) -------- */

const demoResult = {
  risk: "High",
  score: 83,

  senderScore: "Suspicious",
  linkScore: "Dangerous",
  attachmentScore: "Safe",
  headerScore: "Failed Authentication",

  issues: [
    "Sender address does not match official website",
    "Urgent scare words used to force action",
    "Unknown redirecting links detected",
    "Email not verified using DKIM / SPF"
  ],

  recommendation:
    "❗ Do NOT click on any links or download files. Delete the email immediately or report it as phishing."
}
