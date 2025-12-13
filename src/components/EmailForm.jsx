import React, { useState } from "react";
import { motion } from "framer-motion";
import ScanButton from "./ScanButton";
import ResultCard from "./ResultCard";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
    date: "",
    mailedBy: "",
    signedBy: "",
    url: "",
    security: "",
    body: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const e = {};

    if (!formData.from.trim()) e.from = "Sender email is required.";
    if (!formData.body.trim()) e.body = "Email content is required.";

    if (formData.from && !/\S+@\S+\.\S+/.test(formData.from))
      e.from = "Invalid email format.";

    if (formData.to && !/\S+@\S+\.\S+/.test(formData.to))
      e.to = "Invalid email format.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResult(null);
    setServerError("");

    try {
      const res = await fetch("http://localhost:5050/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_email: formData.from,
          to: formData.to,
          subject: formData.subject,
          body: formData.body,
          mailedBy: formData.mailedBy,
          signedBy: formData.signedBy,
          security: formData.security,
          urls: formData.url ? [formData.url] : [],
          attachments: files.map((f) => f.name),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        throw new Error("AI Scan Failed");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setServerError("❌ AI engine is unreachable or failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="scan-section"
        className="w-full py-16 bg-linear-to-b from-black/90 to-black text-white flex justify-center px-4"
      >
        <motion.div
          className="w-full max-w-5xl bg-black/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-400">
              PhishShield Analysis Console
            </h2>
            <p className="text-gray-400 mt-2">
              Your email is analyzed securely — zero data retention.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FROM */}
            <InputField label="Sender Email *" hint="Sender address as shown in inbox" example="support@bank.com" error={errors.from}>
              <input name="from" value={formData.from} onChange={handleChange} className={`input ${errors.from && "ring-red-500"}`} placeholder="sender@example.com" />
            </InputField>

            {/* TO */}
            <InputField label="Recipient Email" hint="Your inbox address" example="you@gmail.com" error={errors.to}>
              <input name="to" value={formData.to} onChange={handleChange} className="input" placeholder="you@example.com" />
            </InputField>

            {/* URL */}
            <InputField label="Suspicious URL / Link" hint="Copy link from the email" example="https://verify-login.example.com">
              <input name="url" value={formData.url} onChange={handleChange} className="input" placeholder="https://example.com" />
            </InputField>

            {/* SUBJECT + DATE */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Subject" hint="Exact subject" example="Account warning">
                <input name="subject" value={formData.subject} onChange={handleChange} className="input" />
              </InputField>

              <InputField label="Received Date" hint="Optional" example="14 March 2025">
                <input name="date" value={formData.date} onChange={handleChange} className="input" />
              </InputField>
            </div>

            {/* MAILED / SIGNED */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Mailed-By" hint="From email headers" example="smtp.mail.com">
                <input name="mailedBy" value={formData.mailedBy} onChange={handleChange} className="input" />
              </InputField>

              <InputField label="Signed-By" hint="From email headers" example="company.com">
                <input name="signedBy" value={formData.signedBy} onChange={handleChange} className="input" />
              </InputField>
            </div>

            {/* SECURITY */}
            <InputField label="Security Warnings" hint="Inbox warnings" example="Suspicious email">
              <input name="security" value={formData.security} onChange={handleChange} className="input" />
            </InputField>

            {/* BODY */}
            <InputField label="Full Email Body *" hint="Paste full email content" example="Remove personal info if needed" error={errors.body}>
              <textarea rows={5} name="body" value={formData.body} onChange={handleChange} className={`input resize-y ${errors.body && "ring-red-500"}`} />
            </InputField>

            {/* ATTACHMENTS */}
            <InputField label="Attachments" hint="Optional files" example="Upload if relevant">
              <label className="upload-btn">
                {files.length ? `${files.length} file(s) chosen` : "Upload Files"}
                <input type="file" multiple hidden onChange={handleFileChange} />
              </label>
            </InputField>

            {/* PREVIEW */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {files.map((file, i) => (
                  <div key={i} className="bg-black/80 rounded-lg relative">
                    <p className="text-xs p-2 text-center truncate">{file.name}</p>
                    <button onClick={() => removeFile(i)} type="button" className="absolute top-1 right-1 text-red-400">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* SUBMIT */}
            <div className="text-center pt-4">
              <ScanButton type="submit">{loading ? "Analyzing..." : "Run AI Threat Scan"}</ScanButton>
              <p className="text-xs text-gray-500 mt-2">Deleted immediately after scan.</p>
              {serverError && <p className="text-red-500">{serverError}</p>}
            </div>

          </form>
        </motion.div>
      </section>

      {/* RESULT */}
      {result && <ResultCard result={result} />}
    </>
  );
};

const InputField = ({ label, hint, example, error, children }) => (
  <div>
    <label className="label">{label}</label>
    {children}
    <p className="text-xs text-gray-400">{hint}</p>
    <p className="text-xs text-gray-500 italic">{example}</p>
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default EmailForm;
