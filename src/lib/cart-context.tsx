"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_PRODUCTS } from "./demo-data";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: { id: string; name: string; slug: string; price: string | number; images?: { url: string }[] }, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_DEMO_CART: CartItem[] = [
  {
    id: DEMO_PRODUCTS[0].id,
    name: DEMO_PRODUCTS[0].name,
    slug: DEMO_PRODUCTS[0].slug,
    price: parseFloat(DEMO_PRODUCTS[0].price),
    image: DEMO_PRODUCTS[0].images[0].url,
    quantity: 1,
    category: DEMO_PRODUCTS[0].category.name,
  },
  {
    id: DEMO_PRODUCTS[1].id,
    name: DEMO_PRODUCTS[1].name,
    slug: DEMO_PRODUCTS[1].slug,
    price: parseFloat(DEMO_PRODUCTS[1].price),
    image: DEMO_PRODUCTS[1].images[0].url,
    quantity: 2,
    category: DEMO_PRODUCTS[1].category.name,
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_DEMO_CART);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dr_natures_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("dr_natures_cart", JSON.stringify(items));
      } catch (e) {
        // ignore
      }
    }
  }, [items, isHydrated]);

  const addItem = (
    product: { id: string; name: string; slug: string; price: string | number; images?: { url: string }[] },
    quantity = 1
  ) => {
    const numPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;
    const imgUrl = product.images?.[0]?.url ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80";

    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: numPrice,
          image: imgUrl,
          quantity,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
