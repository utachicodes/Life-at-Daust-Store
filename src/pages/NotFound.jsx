import React from "react";
import { Link } from "react-router-dom";
import { MoveLeft, HelpCircle } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 bg-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative text-center animate-fade-in-up">
        <div className="relative inline-block mb-12">
          <p className="text-[12rem] sm:text-[16rem] font-[900] text-brand-navy/5 leading-none select-none tracking-tighter">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <HelpCircle size={48} className="text-brand-orange animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-[900] text-brand-navy tracking-tight mb-4 leading-tight">
          Lost in the Lab?
        </h1>
        <p className="text-gray-400 text-base max-w-sm mx-auto mb-12 font-medium leading-relaxed">
          The page you're looking for doesn't exist or has been relocated to another dimension.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="rounded-full px-10 group">
              <MoveLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" size="lg" className="text-brand-navy font-bold hover:bg-gray-50 rounded-full px-10">
              Need Help?
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}