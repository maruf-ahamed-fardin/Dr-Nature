const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null; // API unavailable — caller uses demo data
  }
}

export const api = {
  // Products
  products: (q?: Record<string, string>) => {
    const qs = q ? "?" + new URLSearchParams(q).toString() : "";
    return request<any>(`/products${qs}`);
  },
  product: (slug: string) => request<any>(`/products/${slug}`),
  featuredProducts: (take = 8) => request<any>(`/products/featured?take=${take}`),
  categories: () => request<any>(`/products/categories`),

  // Blog
  blogs: (q?: Record<string, string>) => {
    const qs = q ? "?" + new URLSearchParams(q).toString() : "";
    return request<any>(`/blog${qs}`);
  },
  blog: (slug: string) => request<any>(`/blog/${slug}`),
  blogTags: () => request<any>(`/blog/tags`),

  // Consultants
  consultants: () => request<any>(`/consultants`),
  consultant: (id: string) => request<any>(`/consultants/${id}`),
  services: () => request<any>(`/consultants/services`),

  // Auth
  me: () => request<any>(`/auth/me`),
  login: (data: { email: string; password: string }) =>
    request<any>(`/auth/login`, { method: "POST", body: JSON.stringify(data) }),
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    request<any>(`/auth/register`, { method: "POST", body: JSON.stringify(data) }),
  logout: () => request<any>(`/auth/logout`, { method: "POST" }),

  // Cart
  cart: () => request<any>(`/cart`),
  addToCart: (productId: string, quantity: number) =>
    request<any>(`/cart/items`, { method: "POST", body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId: string, quantity: number) =>
    request<any>(`/cart/items/${productId}`, { method: "PATCH", body: JSON.stringify({ quantity }) }),
  removeCartItem: (productId: string) =>
    request<any>(`/cart/items/${productId}`, { method: "DELETE" }),

  // Orders
  orders: () => request<any>(`/orders`),
  order: (id: string) => request<any>(`/orders/${id}`),

  // Bookings
  createBooking: (data: any) =>
    request<any>(`/bookings`, { method: "POST", body: JSON.stringify(data) }),

  // Reviews
  reviews: (productId: string) => request<any>(`/reviews/product/${productId}`),
  createReview: (productId: string, data: any) =>
    request<any>(`/reviews/product/${productId}`, { method: "POST", body: JSON.stringify(data) }),

  // Shipping
  zones: () => request<any>(`/shipping/zones`),

  // Notifications
  notifications: () => request<any>(`/notifications`),

  // Admin
  adminStats: () => request<any>(`/admin/stats`),
  adminOrders: () => request<any>(`/admin/orders`),
  adminProducts: () => request<any>(`/admin/products`),
  adminBookings: () => request<any>(`/admin/bookings`),
};

export type { };
