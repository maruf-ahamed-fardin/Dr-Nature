"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string | number;
    images?: { url: string }[];
  };
  quantity?: number;
  className?: string;
  variant?: "icon" | "full";
}

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  variant = "full",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleAdd}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
          added
            ? "bg-primary text-white"
            : "bg-white/90 text-foreground hover:bg-primary hover:text-white shadow-md"
        } ${className}`}
        aria-label="Add to Cart"
      >
        {added ? <Check className="w-4 h-4 animate-scale" /> : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold shadow-lg transition-all duration-200 active:scale-95 ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-primary text-white hover:bg-primary/90"
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5 animate-scale" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </>
      )}
    </button>
  );
}
