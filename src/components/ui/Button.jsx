import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none rounded-lg";

  const variants = {
    primary:
      "bg-brand-navy text-white hover:bg-brand-orange",
    secondary:
      "bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
    outline:
      "bg-transparent border border-brand-navy/15 text-brand-navy/70 hover:border-brand-navy hover:text-brand-navy",
    ghost:
      "bg-transparent text-brand-navy/60 hover:bg-brand-navy/5 hover:text-brand-navy",
  };

  const sizes = {
    sm: "px-4 h-9 text-xs",
    md: "px-5 h-11 text-sm",
    lg: "px-7 h-12 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
