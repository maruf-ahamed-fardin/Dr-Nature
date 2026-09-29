"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Rahel Ahmed",
    phone: "01712345678",
    email: "rahel@example.com",
    division: "Dhaka",
    city: "Dhaka",
    address: "House 42, Road 11, Banani",
    notes: "Please call before delivery",
  });

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "cod" | "card">("bkash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState("");

  const shippingCost = subtotal >= 1500 || subtotal === 0 ? 0 : 80;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API order creation
    setTimeout(() => {
      const orderNum = `DN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedOrderNumber(orderNum);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-32 pb-24">
        <div className="container-app max-w-xl">
          <div className="bg-white rounded-3xl border border-border p-8 md:p-12 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
              Order Placed Successfully!
            </span>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Thank You for Your Order
            </h1>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              We&apos;ve sent a confirmation SMS to <strong>{formData.phone}</strong>. Our delivery team will dispatch your natural wellness products shortly.
            </p>

            {/* Order details badge */}
            <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-border/80 text-left space-y-2 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono font-bold text-foreground">{generatedOrderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-semibold text-foreground uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping To:</span>
                <span className="font-medium text-foreground">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-2 font-bold">
                <span className="text-foreground">Total Amount:</span>
                <span className="text-primary">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/account/orders">Track Your Order</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      <div className="container-app">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/cart" className="hover:text-foreground">Cart</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-semibold">Checkout</span>
          </nav>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Checkout & Delivery
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Info Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">1. Customer Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Phone Number (for SMS & delivery) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">2. Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Division *
                  </label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    aria-label="Select division"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="Dhaka">Dhaka Division</option>
                    <option value="Chittagong">Chittagong Division</option>
                    <option value="Sylhet">Sylhet Division</option>
                    <option value="Rajshahi">Rajshahi Division</option>
                    <option value="Khulna">Khulna Division</option>
                    <option value="Barisal">Barisal Division</option>
                    <option value="Rangpur">Rangpur Division</option>
                    <option value="Mymensingh">Mymensingh Division</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Full Street Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Special Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Leave with security, call after 3 PM"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">3. Select Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {/* bKash */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "bkash"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                    className="text-primary"
                  />
                  <Smartphone className="w-5 h-5 text-pink-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-foreground block">bKash Payment</span>
                    <span className="text-[11px] text-muted-foreground">Instant payment via bKash gateway</span>
                  </div>
                </label>

                {/* Nagad */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "nagad"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                    className="text-primary"
                  />
                  <Smartphone className="w-5 h-5 text-orange-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-foreground block">Nagad Payment</span>
                    <span className="text-[11px] text-muted-foreground">Instant payment via Nagad gateway</span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="text-primary"
                  />
                  <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-foreground block">Cash on Delivery</span>
                    <span className="text-[11px] text-muted-foreground">Pay when your order arrives</span>
                  </div>
                </label>

                {/* Credit/Debit Card */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="text-primary"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-foreground block">Debit / Credit Card</span>
                    <span className="text-[11px] text-muted-foreground">Visa, MasterCard, Amex</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-lg text-foreground mb-4">Your Items</h3>

              <div className="divide-y divide-border/60 max-h-60 overflow-y-auto pr-1 mb-4">
                {items.map((i) => (
                  <div key={i.id} className="py-2.5 flex justify-between items-center text-xs">
                    <div className="pr-2">
                      <span className="font-semibold text-foreground block line-clamp-1">{i.name}</span>
                      <span className="text-muted-foreground">Qty: {i.quantity} × ৳{i.price.toLocaleString()}</span>
                    </div>
                    <span className="font-bold text-foreground shrink-0">
                      ৳{(i.quantity * i.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-border text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-foreground">
                    {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                  <span>Total Due</span>
                  <span className="text-primary text-xl font-black">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || items.length === 0}
                className="w-full mt-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Confirm & Place Order <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>SSL Encrypted & Certified</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
