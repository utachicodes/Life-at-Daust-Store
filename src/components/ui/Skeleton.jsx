import React from "react";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-brand-navy/[0.06] rounded-lg ${className}`}
    />
  );
};

export default Skeleton;
