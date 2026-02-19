import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section className="bg-white border-t border-brand-navy/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-3">
            Stay in the Loop
          </h2>
          <p className="text-sm text-brand-navy/50 mb-8 max-w-md mx-auto">
            Get the latest drops, exclusive offers, and campus style tips delivered to your inbox.
          </p>

          {status === "success" ? (
            <div className="bg-brand-cream rounded-lg p-6 border border-brand-navy/[0.06]">
              <p className="text-brand-navy font-medium text-sm mb-1">You're subscribed.</p>
              <p className="text-brand-navy/50 text-sm">Check your inbox for what's next.</p>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 h-11 px-4 bg-brand-cream border border-brand-navy/[0.08] rounded-lg text-sm text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all disabled:opacity-50"
                placeholder="Your email address"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-6 bg-brand-navy text-white text-sm font-medium rounded-lg hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {error && status === "error" && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <p className="mt-4 text-[11px] text-brand-navy/30">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
