import React from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaLink,
  FaPaperclip,
  FaIdBadge,
  FaExclamationTriangle,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";


export default function ResultCard({ result = demoResult }) {

  const riskUI = {
    High: {
      border: "border-red-500/60",
      badge: "bg-red-500/10 text-red-400 border-red-500/40",
      bar: "bg-gradient-to-r from-red-600 to-red-400",
      title: "PHISHING THREAT DETECTED",
      msg: "This email shows strong phishing indicators."
    },
    Medium: {
      border: "border-yellow-400/60",
      badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/40",
      bar: "bg-gradient-to-r from-yellow-500 to-yellow-300",
      title: "SUSPICIOUS ACTIVITY FOUND",
      msg: "This email may be dangerous. Be careful."
    },
    Low: {
      border: "border-green-500/60",
      badge: "bg-green-500/10 text-green-400 border-green-500/40",
      bar: "bg-gradient-to-r from-green-500 to-green-400",
      title: "NO MAJOR THREATS FOUND",
      msg: "No harmful content detected."
    }
  };

  const t = riskUI[result.risk];


  return (
    <section className="bg-linear-to-b from-black to-gray-950 py-24 px-4 flex justify-center">

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-6xl bg-black/70 backdrop-blur-xl border ${t.border} rounded-3xl shadow-2xl p-6 sm:p-10`}
      >

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              <FaShieldAlt className="text-cyan-400" /> Threat Report
            </h2>
            <p className="text-gray-400 text-sm mt-1">PhishShield AI Result</p>
          </div>

          <div className={`px-6 py-1 rounded-full border text-sm font-semibold tracking-wide ${t.badge}`}>
            {t.title}
          </div>
        </div>


        {/* RISK BAR */}
        <div className="bg-black/80 rounded-xl p-5 mb-8 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">THREAT CONFIDENCE</p>

          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 1 }}
              className={`h-full ${t.bar}`}
            />
          </div>

          <p className="text-right text-sm mt-1 text-gray-300">
            {result.score}% Risk Probability
          </p>
        </div>


        {/* SUMMARY */}
        <div className="bg-black/80 border border-white/10 rounded-xl p-5 mb-10">
          <p className="text-gray-300">{t.msg}</p>
        </div>


        {/* SIGNALS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Signal icon={<FaUserShield />} title="Sender Trust" value={result.senderScore} />
          <Signal icon={<FaLink />} title="Links" value={result.linkScore} />
          <Signal icon={<FaPaperclip />} title="Attachments" value={result.attachmentScore} />
          <Signal icon={<FaIdBadge />} title="Header Auth" value={result.headerScore} />
        </div>


        {/* ISSUES */}
        <div className="bg-black/80 border border-red-400/30 rounded-xl p-5 mb-8">
          <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-3">
            <FaExclamationTriangle /> Detected Issues
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {result.issues.map((x,i)=> <li key={i}>{x}</li>)}
          </ul>
        </div>


        {/* PRECAUTION */}
        <div className="bg-black/80 border border-green-400/30 rounded-xl p-5">
          <h3 className="text-green-400 font-semibold flex items-center gap-2 mb-2">
            <FaCheckCircle /> What Should You Do?
          </h3>
          <p className="text-gray-300">{result.recommendation}</p>
        </div>

      </motion.div>

    </section>
  );
}



/* SIGNAL CARD */
function Signal({ title, value, icon }) {

  const color =
    value === "Safe" ? "text-green-400" :
    value === "Suspicious" ? "text-yellow-300" :
    "text-red-400";

  const stateIcon =
    value === "Safe" ? <FaCheckCircle/> :
    value === "Suspicious" ? <FaExclamationTriangle/> :
    <FaTimesCircle/>;

  return (
    <div className="bg-black/80 border border-white/10 rounded-xl p-4">

      <p className="text-sm text-gray-400">{title}</p>

      <div className={`flex items-center gap-2 font-semibold ${color} mt-1`}>
        {icon} {stateIcon} {value}
      </div>

    </div>
  );
}



/* DEMO DATA */
const demoResult = {
  risk: "High",
  score: 83,

  senderScore: "Suspicious",
  linkScore: "Dangerous",
  attachmentScore: "Safe",
  headerScore: "Failed Authentication",

  issues: [
    "Sender domain impersonation detected",
    "Urgency-based language pattern used",
    "Malicious redirect URLs detected",
    "SPF/DKIM authentication failed"
  ],

  recommendation:
    "Do NOT click any links or download attachments. Delete this message immediately or report as phishing."
};
