import React, { useState } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { Lock, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  if (isAdmin) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (login(password)) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid password");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl text-brand-navy">
              LIFE AT DAUST
            </span>
          </Link>
          <p className="text-sm text-brand-navy/40 mt-2">
            Staff & Administrator Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-brand-navy/[0.06] p-8">
          <h1 className="font-serif text-xl text-brand-navy mb-1">
            Sign in
          </h1>
          <p className="text-sm text-brand-navy/40 mb-8">
            Enter your admin credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-brand-navy/40 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/20 h-4 w-4" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-brand-cream/60 border border-brand-navy/[0.08] rounded-lg pl-10 pr-4 text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full group"
              loading={loading}
            >
              Continue
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-sm text-brand-navy/30 hover:text-brand-orange transition-colors"
          >
            Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
