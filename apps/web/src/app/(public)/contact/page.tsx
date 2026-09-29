"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Product Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      {/* Banner */}
      <div className="bg-primary text-white py-14 mb-10">
        <div className="container-app">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-green-300 mb-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Fast & Friendly Support
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              We&apos;re Here to Help
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Have questions about an order, supplement dosage, or consultation booking? Reach out to our Dhaka support team.
            </p>
          </div>
        </div>
      </div>

      <div className="container-app">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-6">
              <h2 className="font-bold text-lg text-foreground">Direct Contact</h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block text-sm">Customer Helpline</span>
                    <span className="text-muted-foreground">+880 1700-000000</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">Sat - Thu: 9 AM – 9 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block text-sm">Email Support</span>
                    <span className="text-muted-foreground">hello@drnatures.com</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Response within 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block text-sm">Dhaka Wellness Clinic</span>
                    <span className="text-muted-foreground leading-relaxed">
                      House 24, Road 8/A, Dhanmondi, Dhaka-1209, Bangladesh
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="pt-4 border-t border-border">
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm text-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Clinic Working Hours
              </h3>
              <div className="flex justify-between text-muted-foreground pt-2">
                <span>Saturday – Thursday:</span>
                <span className="font-semibold text-foreground">9:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Friday:</span>
                <span className="font-semibold text-foreground">3:00 PM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-foreground mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Thank you for reaching out. A Dr Natures healthcare advisor will get back to you shortly via phone or email.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold font-display text-foreground mb-1">
                  Send us a Message
                </h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Fill in the form below and we will respond as soon as possible.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Hasan"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tanvir@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Subject Inquiry
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      aria-label="Select subject"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Product Inquiry">Product Information & Dosage</option>
                      <option value="Consultation Booking">Doctor Consultation Question</option>
                      <option value="Order Tracking">Order & Delivery Status</option>
                      <option value="Partnership">Wholesale & Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
