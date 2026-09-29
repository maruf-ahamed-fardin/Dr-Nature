"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Doctor {
  id: number;
  name: string;
  degree: string;
  specialty: string;
  mode: string;
  rating: string;
  reviews: string;
  feeBDT: number;
  img: string;
}

export interface Product {
  id: number;
  name: string;
  category: "Books" | "Supplements" | "Diet" | "Bundles";
  priceBDT: number;
  oldPriceBDT: number;
  img: string;
  desc: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface ToastMessage {
  id: number;
  message: string;
}

export interface AiChatMessage {
  sender: "bot" | "user";
  text: string;
}

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 1,
    name: "Dr. Farhana Ahmed",
    degree: "M.Sc Nutrition (DU), BMDC Reg. A-8841",
    specialty: "PCOS",
    mode: "Online & Clinic",
    rating: "4.9",
    reviews: "142",
    feeBDT: 1200,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Mahbubur Rahman",
    degree: "MBBS, DEM (Diabetology), FCPS",
    specialty: "Diabetes",
    mode: "In-Clinic Only",
    rating: "4.8",
    reviews: "98",
    feeBDT: 1500,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Nusrat Jahan",
    degree: "Clinical Dietitian, Hormonal Health Specialist",
    specialty: "Nutrition",
    mode: "Online Video",
    rating: "5.0",
    reviews: "85",
    feeBDT: 1000,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 101,
    name: "PCOS Natural Management Guide",
    category: "Books",
    priceBDT: 490,
    oldPriceBDT: 650,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=400&auto=format&fit=crop",
    desc: "Complete dietary guide with local BD meal plan blueprints for managing hormonal imbalance.",
  },
  {
    id: 102,
    name: "Organic Cold-Pressed Black Seed Oil",
    category: "Supplements",
    priceBDT: 850,
    oldPriceBDT: 1000,
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&h=400&auto=format&fit=crop",
    desc: "Unrefined 250ml black cumin seed oil rich in thymoquinone for metabolic immunity.",
  },
  {
    id: 103,
    name: "Pure Sundarban Raw Honey (500g)",
    category: "Diet",
    priceBDT: 720,
    oldPriceBDT: 850,
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
    desc: "Wild harvested, unpasteurized honey rich in natural active enzymes and antioxidants.",
  },
  {
    id: 104,
    name: "Metabolic Support Care Package",
    category: "Bundles",
    priceBDT: 1850,
    oldPriceBDT: 2200,
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400&h=400&auto=format&fit=crop",
    desc: "Includes Black Seed Oil, Herbal Tea, and the PCOS Guidebook at a discounted price.",
  },
];

interface BookingState {
  isOpen: boolean;
  docName: string;
  specialty: string;
  feeBDT: number;
}

interface EcosystemContextType {
  currency: "BDT" | "USD";
  setCurrency: (c: "BDT" | "USD") => void;
  formatPrice: (bdtVal: number) => string;
  getSymbol: () => string;
  
  toasts: ToastMessage[];
  showToast: (msg: string) => void;
  
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalCartCount: number;
  subtotalBDT: number;
  discountBDT: number;
  shippingBDT: number;
  grandTotalBDT: number;
  couponCode: string;
  discountPercentage: number;
  applyCoupon: (code: string) => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  
  wishlistCount: number;
  toggleWishlist: () => void;
  
  booking: BookingState;
  openBooking: (docName: string, specialty: string, feeBDT: number) => void;
  closeBooking: () => void;
  
  quickProduct: Product | null;
  openQuickView: (prod: Product) => void;
  closeQuickView: () => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  toggleMobileDrawer: () => void;
  
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
  toggleAiChat: () => void;
  aiMessages: AiChatMessage[];
  sendAiMessage: (msg: string) => void;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<"BDT" | "USD">("BDT");
  const USD_RATE = 0.0083;

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(1);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const [booking, setBooking] = useState<BookingState>({
    isOpen: false,
    docName: "Dr. Farhana Ahmed",
    specialty: "Clinical Nutritionist • PCOS Specialist",
    feeBDT: 1200,
  });

  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const [aiMessages, setAiMessages] = useState<AiChatMessage[]>([
    {
      sender: "bot",
      text: "Hello! I'm your Dr Natures Assistant. Ask me about PCOS diet suggestions, black seed oil uses, or booking a doctor visit!",
    },
  ]);

  // Toast Helper
  const showToast = (msg: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const setCurrency = (c: "BDT" | "USD") => {
    setCurrencyState(c);
    showToast(`Currency updated to ${c}`);
  };

  const formatPrice = (bdtVal: number) => {
    if (currency === "USD") {
      return `$ ${(bdtVal * USD_RATE).toFixed(2)}`;
    }
    return `৳ ${bdtVal.toLocaleString()}`;
  };

  const getSymbol = () => (currency === "USD" ? "$" : "৳");

  // Cart operations
  const addToCart = (productId: number) => {
    const prod = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!prod) return;

    setCart((prev) => {
      const exists = prev.find((item) => item.id === productId);
      if (exists) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...prod, qty: 1 }];
    });
    showToast("Item added to Cart!");
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    setCouponCode(clean);
    if (clean === "NATURE10") {
      setDiscountPercentage(10);
      showToast("10% Discount Applied!");
    } else {
      setDiscountPercentage(0);
      showToast("Invalid Coupon Code");
    }
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotalBDT = cart.reduce((sum, i) => sum + i.priceBDT * i.qty, 0);
  const discountBDT = (subtotalBDT * discountPercentage) / 100;
  const shippingBDT = subtotalBDT > 0 ? 80 : 0;
  const grandTotalBDT = subtotalBDT - discountBDT + shippingBDT;

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleAiChat = () => setIsAiChatOpen((prev) => !prev);

  const toggleWishlist = () => {
    setWishlistCount((c) => c + 1);
    showToast("Saved 1 Item in your Wishlist!");
  };

  // Booking Modal
  const openBooking = (docName: string, specialty: string, feeBDT: number) => {
    setBooking({
      isOpen: true,
      docName,
      specialty,
      feeBDT,
    });
  };

  const closeBooking = () => {
    setBooking((prev) => ({ ...prev, isOpen: false }));
  };

  // Quick View Modal
  const openQuickView = (prod: Product) => setQuickProduct(prod);
  const closeQuickView = () => setQuickProduct(null);

  // AI Chat
  const sendAiMessage = (msg: string) => {
    if (!msg.trim()) return;
    const userText = msg.trim();
    setAiMessages((prev) => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `For personalized clinical guidance regarding "${userText}", we recommend scheduling an online appointment with Dr. Farhana Ahmed or exploring our cold-pressed organic black seed oil in the Apothecary.`,
        },
      ]);
    }, 600);
  };

  return (
    <EcosystemContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        getSymbol,
        toasts,
        showToast,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        totalCartCount,
        subtotalBDT,
        discountBDT,
        shippingBDT,
        grandTotalBDT,
        couponCode,
        discountPercentage,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        wishlistCount,
        toggleWishlist,
        booking,
        openBooking,
        closeBooking,
        quickProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        setIsSearchOpen,
        toggleSearch,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        toggleMobileDrawer,
        isAiChatOpen,
        setIsAiChatOpen,
        toggleAiChat,
        aiMessages,
        sendAiMessage,
      }}
    >
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error("useEcosystem must be used within an EcosystemProvider");
  }
  return context;
}
