import React, { useState } from "react";
import { motion } from "framer-motion";
import ScanButton from "./ScanButton";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
    date: "",
    mailedBy: "",
    signedBy: "",
    security: "",
    body: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const validate = () => {
    const e = {};

    if (!formData.from.trim()) e.from = "Sender email is required";
    if (!formData.body.trim()) e.body = "Email content is required";

    if (formData.from && !/\S+@\S+\.\S+/.test(formData.from))
      e.from = "Invalid email format";

    if (formData.to && !/\S+@\S+\.\S+/.test(formData.to))
      e.to = "Invalid email format";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("🚀 Email submitted for AI analysis (Mock)");
  };

  return (
    <section id="scan-section" className="w-full py-16 bg-linear-to-b from-black to-black text-white flex justify-center px-4">
      <motion.div
        className="w-full max-w-5xl bg-black/80 backdrop-blur rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-cyan-400">
            PhishShield Analysis Console
          </h2>
          <p className="text-gray-400 mt-2">
            Your email is analyzed securely in real-time — no data is stored.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <InputField label="Sender Email *" hint="Official sender address as shown in inbox" example="Example: support@bank.com" error={errors.from}>
            <input name="from" value={formData.from} onChange={handleChange} className={`input ${errors.from && "ring-red-500"}`} />
          </InputField>

          <InputField label="Recipient Email" hint="The email address which received this message" example="Example: you@gmail.com" error={errors.to}>
            <input name="to" value={formData.to} onChange={handleChange} className="input" />
          </InputField>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Subject" hint="Exact subject as shown" example="Security Alert">
              <input name="subject" value={formData.subject} onChange={handleChange} className="input" />
            </InputField>

            <InputField label="Received Date" hint="Timestamp from email" example="15 Mar 2025, 10:30 AM">
              <input name="date" value={formData.date} onChange={handleChange} className="input" />
            </InputField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Mailed-By" hint="Server name from headers" example="mail.company.com">
              <input name="mailedBy" value={formData.mailedBy} onChange={handleChange} className="input" />
            </InputField>

            <InputField label="Signed-By" hint="Signed domain from headers" example="company.com">
              <input name="signedBy" value={formData.signedBy} onChange={handleChange} className="input" />
            </InputField>
          </div>

          <InputField label="Security Warnings" hint="Any warnings displayed by your email provider" example="Suspicious login attempt">
            <input name="security" value={formData.security} onChange={handleChange} className="input" />
          </InputField>

          <InputField label="Full Email Content *" hint="Entire body of email" example="Remove personal data if needed" error={errors.body}>
            <textarea name="body" rows={5} value={formData.body} onChange={handleChange} className={`input ${errors.body && "ring-red-500"}`} />
          </InputField>

          <InputField label="Attachments" hint="Screenshots or files" example="Multiple uploads allowed">
            <label className="upload-btn">
              {files.length ? `${files.length} file(s)` : "Upload Files"}
              <input type="file" multiple hidden onChange={handleFileChange} />
            </label>
          </InputField>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {files.map((file, i) => (
                <div key={i} className="bg-black/70 rounded-lg relative overflow-hidden">
                  <p className="text-xs truncate px-2">{file.name}</p>
                  <button onClick={() => removeFile(i)} type="button" className="absolute top-1 right-1 text-red-400">✕</button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-6">
            <ScanButton>Run AI Threat Scan</ScanButton>
            <p className="text-xs text-gray-500 mt-2">Instant deletion after processing.</p>
          </div>

        </form>
      </motion.div>
    </section>
  );
};

const InputField = ({ label, hint, example, error, children }) => (
  <div>
    <label className="label">{label}</label>
    {children}
    <p className="text-xs text-gray-400 mt-1">{hint}</p>
    <p className="text-xs text-gray-500 italic">{example}</p>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default EmailForm;
