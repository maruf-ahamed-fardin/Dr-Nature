"use client";

const DEMO_CUSTOMERS = [
  { id: "c-1", name: "Rahel Ahmed", email: "rahel@example.com", phone: "01712345678", orders: 3, district: "Dhaka" },
  { id: "c-2", name: "Nasrin Begum", email: "nasrin@example.com", phone: "01812345678", orders: 5, district: "Chittagong" },
  { id: "c-3", name: "Karim Hossain", email: "karim@example.com", phone: "01912345678", orders: 2, district: "Sylhet" },
  { id: "c-4", name: "Riya Das", email: "riya@example.com", phone: "01612345678", orders: 1, district: "Rajshahi" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Patient & Customer Directory
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          View registered patients, health consultation histories, and order frequency.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3">Name</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">District</th>
                <th className="pb-3">Completed Orders</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DEMO_CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-bold text-foreground">{c.name}</td>
                  <td className="py-3">
                    <span className="block text-foreground">{c.email}</span>
                    <span className="text-muted-foreground text-[10px]">{c.phone}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.district}</td>
                  <td className="py-3 font-bold text-foreground">{c.orders} orders</td>
                  <td className="py-3 text-right">
                    <button className="text-primary hover:underline font-semibold text-xs">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
