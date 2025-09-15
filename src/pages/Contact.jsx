import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import HCaptcha from "@hcaptcha/react-hcaptcha";


const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the hCaptcha challenge.");
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    };

    try {
      await emailjs.send(
        "your_service_id",   // replace with your actual ID
        "your_template_id",  // replace with your actual ID
        templateParams,
        "your_public_key"    // replace with your actual public key
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="container py-5 text-white" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">Contact Us</h1>

      {sent ? (
        <div className="alert alert-success text-center">
          Message sent successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <HCaptcha
              sitekey="your-hcaptcha-site-key"
              onVerify={(token) => setCaptchaToken(token)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-light w-100">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
