"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    if (promoInput.toUpperCase() === "NATURE10" || promoInput.toUpperCase() === "WELCOME") {
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try 'NATURE10'");
    }
  };

  const shippingCost = subtotal >= 1500 || subtotal === 0 ? 0 : 80;
  const grandTotal = Math.max(0, subtotal - promoDiscount + shippingCost);

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      <div className="container-app">
        {/* Page Title */}
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
            Checkout Step 1 of 2
          </span>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Shopping Cart {itemCount > 0 && `(${itemCount} items)`}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven&apos;t added any wellness products to your cart yet. Explore our supplements and health books.
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">
                Explore Shop <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-bold text-foreground">Items in your cart</h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted relative shrink-0 border border-border">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🌿</div>
                          )}
                        </div>
                        <div>
                          {item.category && (
                            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                              {item.category}
                            </span>
                          )}
                          <Link
                            href={`/shop/${item.slug}`}
                            className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <span className="text-xs text-muted-foreground block mt-0.5">
                            Unit Price: ৳{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-border rounded-xl bg-[hsl(var(--muted)/0.4)] p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-muted-foreground hover:text-foreground transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-muted-foreground hover:text-foreground transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <span className="font-extrabold text-sm text-foreground block">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery info banner */}
              <div className="p-4 rounded-2xl bg-white border border-border flex items-center gap-3 text-xs text-muted-foreground">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <span>
                  {subtotal >= 1500 ? (
                    <strong className="text-emerald-600 font-semibold">
                      🎉 You qualify for FREE shipping across Bangladesh!
                    </strong>
                  ) : (
                    <span>
                      Add <strong>৳{(1500 - subtotal).toLocaleString()}</strong> more to get{" "}
                      <strong>FREE nationwide delivery</strong>!
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-lg text-foreground mb-4">Order Summary</h3>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">
                    Have a promo coupon?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="e.g. NATURE10"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-[hsl(var(--muted)/0.4)] focus:outline-none focus:ring-2 focus:ring-primary/20 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-secondary text-foreground rounded-xl text-xs font-semibold hover:bg-secondary/80 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> Coupon NATURE10 applied (10% off)
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500 mt-2">{promoError}</p>
                  )}
                </form>

                {/* Calculations */}
                <div className="space-y-3 pt-4 border-t border-border/80 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Coupon Discount</span>
                      <span className="font-semibold">-৳{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-foreground">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
                      ) : (
                        `৳${shippingCost}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="font-bold text-foreground">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-primary">
                        ৳{grandTotal.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground block">
                        VAT included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Button size="lg" className="w-full mt-6" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Secure SSL 256-Bit Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
