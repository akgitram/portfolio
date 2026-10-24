
import { useState } from "react";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";
import api from "../api/api";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await api.post("/contact", form);
      setStatus("success:Your message was sent successfully.");
      setForm(initialForm);
    } catch (error) {
      setStatus(
        "error:" +
          (error.response?.data?.message ||
            "Unable to send your message. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative w-full px-3 py-10 sm:px-5 sm:py-12">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10
                   h-56 w-56 -translate-x-1/2 -translate-y-1/2
                   rounded-full bg-cyan-500/10 blur-[90px]
                   sm:h-72 sm:w-72"
      />

      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-7">
          <span
            className="mb-3 inline-flex items-center gap-2 rounded-full
                       border border-cyan-400/20 bg-cyan-400/10
                       px-3 py-1.5 text-xs font-semibold uppercase
                       tracking-[0.15em] text-cyan-300"
          >
            <MessageSquare size={14} />
            Get in touch
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Let&apos;s work{" "}
            <span className="text-cyan-400">together.</span>
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">
            Have a project or opportunity? Send me a message.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl
                     border border-white/10 bg-[#111820]/95
                     p-4 shadow-[0_15px_50px_rgba(0,0,0,0.3)]
                     backdrop-blur-xl sm:p-6 md:p-7"
        >
          {/* Top accent line */}
          <div className="absolute left-0 top-0 h-px w-full
                          bg-gradient-to-r from-transparent
                          via-cyan-400/80 to-transparent" />

          {/* Form header */}
          <div className="mb-5 flex items-center gap-3
                          border-b border-white/[0.08] pb-4">
            <div className="flex h-9 w-9 shrink-0 items-center
                            justify-center rounded-lg
                            border border-cyan-400/20
                            bg-cyan-400/10 text-cyan-300">
              <Mail size={17} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Send a message
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                Fill in the details below.
              </p>
            </div>
          </div>

          {/* Name and email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block min-w-0">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                <User size={14} className="text-cyan-400" />
                Your name
              </span>

              <input
                className="w-full min-w-0 rounded-lg border border-white/10
                           bg-[#0b1118] px-3.5 py-2.5 text-sm text-white
                           outline-none transition placeholder:text-slate-600
                           focus:border-cyan-400/60
                           focus:ring-2 focus:ring-cyan-400/10"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                minLength={2}
                maxLength={100}
                required
              />
            </label>

            <label className="block min-w-0">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Mail size={14} className="text-cyan-400" />
                Email address
              </span>

              <input
                className="w-full min-w-0 rounded-lg border border-white/10
                           bg-[#0b1118] px-3.5 py-2.5 text-sm text-white
                           outline-none transition placeholder:text-slate-600
                           focus:border-cyan-400/60
                           focus:ring-2 focus:ring-cyan-400/10"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={254}
                required
              />
            </label>
          </div>

          {/* Subject */}
          <label className="mt-4 block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
              <FileText size={14} className="text-cyan-400" />
              Subject
              <span className="text-xs font-normal text-slate-500">
                (optional)
              </span>
            </span>

            <input
              className="w-full rounded-lg border border-white/10
                         bg-[#0b1118] px-3.5 py-2.5 text-sm text-white
                         outline-none transition placeholder:text-slate-600
                         focus:border-cyan-400/60
                         focus:ring-2 focus:ring-cyan-400/10"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Project inquiry"
              maxLength={150}
            />
          </label>

          {/* Message */}
          <label className="mt-4 block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
              <MessageSquare size={14} className="text-cyan-400" />
              Your message
            </span>

            <textarea
              className="min-h-[100px] w-full resize-y rounded-lg
                         border border-white/10 bg-[#0b1118]
                         px-3.5 py-2.5 text-sm leading-6 text-white
                         outline-none transition placeholder:text-slate-600
                         focus:border-cyan-400/60
                         focus:ring-2 focus:ring-cyan-400/10 sm:min-h-[120px]"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              minLength={10}
              maxLength={5000}
              required
            />

            <span className="mt-1 block text-right text-xs text-slate-500">
              {form.message.length}/5000
            </span>
          </label>

          {/* Status */}
          {status && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-4 rounded-lg border px-3 py-2.5 text-sm ${
                status.startsWith("success:")
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                  : "border-rose-400/20 bg-rose-400/10 text-rose-300"
              }`}
            >
              {status.slice(status.indexOf(":") + 1)}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center
                       gap-2 rounded-lg bg-cyan-400 px-4 py-3
                       text-sm font-bold text-[#071018]
                       shadow-lg shadow-cyan-500/10
                       transition duration-300 hover:bg-cyan-300
                       focus:outline-none focus:ring-2
                       focus:ring-cyan-300 focus:ring-offset-2
                       focus:ring-offset-[#111820]
                       disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send message"}
            <Send size={15} className={loading ? "animate-pulse" : ""} />
          </button>
        </form>
      </div>
    </section>
  );
}