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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleFileChange = (e) => {
      setFiles(Array.from(e.target.files));
    };

    const removeFile = (index) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    const validate = () => {
      let newErrors = {};

      if (!formData.from.trim()) newErrors.from = "Sender email is required.";
      if (!formData.body.trim()) newErrors.body = "Email message is required.";

      if (formData.from && !formData.from.includes("@"))
        newErrors.from = "Enter a valid email address.";

      if (formData.to && !formData.to.includes("@"))
        newErrors.to = "Enter a valid email address.";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;

      alert("✅ Scan Started Successfully (Mock)");
    };

    return (
      <section
        id="scan-section"
        className="w-full py-16 bg-linear-to-b from-black/90 to-black text-white flex justify-center px-4"
      >
        <motion.div
          className="w-full max-w-5xl bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-400">
              PhishShield Email Scanner
            </h2>
            <p className="text-gray-400 mt-2">
              Paste your email details below and upload files if needed.  
              We *never* save your data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FROM */}
            <InputField
              label="Who sent you this email? *"
              hint="Enter the sender’s email address exactly as shown in your inbox."
              example="Example: no-reply@amazon.in"
              error={errors.from}
            >
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="sender@example.com"
                className={`input ${errors.from && "ring-red-500"}`}
              />
            </InputField>

            {/* TO */}
            <InputField
              label="Which email did receive it?"
              hint="Your email address where you received this message."
              example="Example: yourname@gmail.com"
              error={errors.to}
            >
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`input ${errors.to && "ring-red-500"}`}
              />
            </InputField>

            {/* SUBJECT + DATE */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Email Subject"
                hint="Write the subject line exactly as you saw it."
                example="Example: Your account is at risk"
              >
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                />
              </InputField>

              <InputField
                label="Date & Time (optional)"
                hint="When did you receive this email?"
                example="Example: 14 Mar 2025, 11:45 AM"
              >
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                />
              </InputField>
            </div>

            {/* MAILED / SIGNED */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Mailed By"
                hint="Shown inside email details → ‘mailed-by’"
                example="Example: server.company.com"
              >
                <input
                  type="text"
                  name="mailedBy"
                  value={formData.mailedBy}
                  onChange={handleChange}
                  className="input"
                />
              </InputField>

              <InputField
                label="Signed By"
                hint="Shown inside email details → ‘signed-by’"
                example="Example: company.com"
              >
                <input
                  type="text"
                  name="signedBy"
                  value={formData.signedBy}
                  onChange={handleChange}
                  className="input"
                />
              </InputField>
            </div>

            {/* SECURITY */}
            <InputField
              label="Warnings or security notes"
              hint="Any text like ‘This message looks dangerous’ or ‘Encrypted mail’"
              example="Example: This message might be suspicious"
            >
              <input
                type="text"
                name="security"
                value={formData.security}
                onChange={handleChange}
                className="input"
              />
            </InputField>

            {/* BODY */}
            <InputField
              label="Full message text *"
              hint="Paste the entire message content here."
              example="Tip: You may remove sensitive data."
              error={errors.body}
            >
              <textarea
                rows={5}
                name="body"
                value={formData.body}
                onChange={handleChange}
                className={`input resize-y ${errors.body && "ring-red-500"}`}
                placeholder="Paste email text here..."
              />
            </InputField>

            {/* ATTACHMENTS */}
            <InputField
              label="Attachments (optional)"
              hint="Upload screenshots, PDFs, or files."
              example="You can upload multiple files"
            >
              <label className="upload-btn">
                {files.length > 0 ? `${files.length} files selected` : "Choose Files"}
                <input type="file" multiple hidden onChange={handleFileChange} />
              </label>
            </InputField>

            {/* FILE PREVIEW */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {files.map((file, i) => {
                  const img = file.type.startsWith("image")
                    ? URL.createObjectURL(file)
                    : null;

                  return (
                    <div key={i} className="bg-black/80 rounded-lg overflow-hidden relative">
                      {img ? (
                        <img src={img} className="h-24 w-full object-cover" />
                      ) : (
                        <div className="h-24 flex justify-center items-center text-2xl">📄</div>
                      )}
                      <p className="text-xs truncate px-2">{file.name}</p>
                      <button
                        onClick={() => removeFile(i)}
                        type="button"
                        className="absolute top-1 right-1 text-red-500"
                      >✕</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUBMIT */}
            <div className="text-center pt-4">
              <ScanButton type="submit">Scan Now</ScanButton>
              <p className="text-xs text-gray-500 mt-2">Your data is deleted after scan.</p>
            </div>

          </form>
        </motion.div>
      </section>
    );
  };

  /* INPUT UI */
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
