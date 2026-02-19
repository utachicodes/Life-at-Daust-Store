import React, { useState } from "react";
import { AlertCircle, CheckCircle, Mail, MapPin, Clock, ArrowRight, MessageSquare, Phone, Globe, ChevronDown, ShieldCheck } from "lucide-react";
import Button from "../components/ui/Button";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-base font-[700] transition-colors duration-300 ${open ? 'text-brand-orange' : 'text-brand-navy group-hover:text-brand-orange'}`}>
          {question}
        </span>
        <ChevronDown size={18} className={`text-gray-300 transition-transform duration-500 ${open ? 'rotate-180 text-brand-orange' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "At least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (!validateForm()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setForm({ firstName: "", lastName: "", email: "", message: "" });
    setErrors({});
  };

  const inputClasses = (field) =>
    `mt-1.5 w-full border rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-orange/5 transition-all duration-300 ${errors[field] ? 'border-red-300' : 'border-gray-100'}`;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl shadow-black/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
          <MessageSquare size={18} />
        </div>
        <h3 className="text-2xl font-[900] text-brand-navy tracking-tight">Direct Inquiry</h3>
      </div>

      {success && (
        <div className="mb-8 p-5 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4 text-green-700 text-sm font-bold animate-fade-in">
          <CheckCircle size={20} />
          Your message has been received. We'll reply within 24 hours.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">First name</label>
          <input className={inputClasses('firstName')} placeholder="Amadou" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          {errors.firstName && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Last name</label>
          <input className={inputClasses('lastName')} placeholder="Diop" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          {errors.lastName && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
        <input type="email" className={inputClasses('email')} placeholder="student@daust.edu.sn" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase">{errors.email}</p>}
      </div>

      <div className="mt-6">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">How can we help?</label>
        <textarea rows="6" className={inputClasses('message')} placeholder="Tell us about your order or collaboration idea..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        {errors.message && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase">{errors.message}</p>}
      </div>

      <Button type="submit" loading={loading} className="mt-10 w-full rounded-2xl h-14 group text-xs font-black uppercase tracking-[0.2em]">
        Send Message <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}

export default function Contact() {
  const info = [
    { icon: Mail, title: "Support", text: "care@lifeatdaust.com", detail: "24/7 Digital support" },
    { icon: MapPin, title: "Visit Us", text: "Ngaparou, Mbour", detail: "DAUST Innovation Hub" },
    { icon: Phone, title: "Call", text: "+221 33 000 00 00", detail: "Mon · Fri, 9am · 6pm" },
  ];

  const faqs = [
    { question: "When will my order arrive?", answer: "Orders within Dakar are typically delivered within 24-48 hours. International shipping takes 7-10 business days depending on location." },
    { question: "How do I exchange sizes?", answer: "We offer a 7-day hassle-free exchange policy. Simply bring the item to the campus store or contact our support team to arrange a pickup." },
    { question: "Are the designs student-made?", answer: "Yes, 100%. Every piece in our collection is designed by DAUST students through our periodic Design Labs." },
    { question: "Do you ship worldwide?", answer: "Absolutely. We ship to over 50 countries globally to keep our alumni community connected." },
  ];

  return (
    <main className="bg-white">
      {/* Premium Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-30 scale-110 blur-sm" src="/assets/DaustianShoot/Homepage.jpg" alt="Contact banner" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block text-brand-orange text-[11px] font-black uppercase tracking-[0.3em] mb-6">Concierge</span>
            <h1 className="text-[clamp(3.5rem,8vw,5.5rem)] font-[900] text-white tracking-[-0.04em] leading-[0.9] mb-8">
              We're here for <br /> the family.
            </h1>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              Whether you're looking for a custom collection or need help with an order,
              our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

          {/* Left: Contact Info & FAQ */}
          <div className="lg:col-span-5 space-y-20">

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-6">
              {info.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group p-8 rounded-[2rem] border border-gray-100 hover:border-brand-orange/20 hover:bg-orange-50/30 transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{item.title}</h3>
                        <p className="text-lg font-[800] text-brand-navy mb-1">{item.text}</p>
                        <p className="text-sm text-gray-400">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl font-[900] text-brand-navy tracking-tight mb-8">Frequent Questions</h2>
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="sticky top-32">
              <ContactForm />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
