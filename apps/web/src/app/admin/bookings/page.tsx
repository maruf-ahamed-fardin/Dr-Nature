"use client";

import { Calendar, Clock, Video, User } from "lucide-react";

const DEMO_ADMIN_BOOKINGS = [
  {
    id: "DNB-481923",
    patient: "Rahel Ahmed",
    doctor: "Dr. Nadia Islam",
    time: "Tomorrow, 10:00 AM",
    type: "Online Video",
    status: "CONFIRMED",
    fee: "৳800",
  },
  {
    id: "DNB-392014",
    patient: "Nasrin Begum",
    doctor: "Dr. Farhan Ahmed",
    time: "Tomorrow, 02:00 PM",
    type: "In-Person Clinic",
    status: "CONFIRMED",
    fee: "৳1,500",
  },
  {
    id: "DNB-219402",
    patient: "Karim Hossain",
    doctor: "Sadia Khan",
    time: "Oct 2, 11:30 AM",
    type: "Diet Plan Package",
    status: "PENDING_REVIEW",
    fee: "৳2,500",
  },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Consultation & Appointment Schedule
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Doctor allocation, patient telemedicine rooms, and in-person clinic appointments.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3">Booking Pass</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Consultant</th>
                <th className="pb-3">Schedule</th>
                <th className="pb-3">Mode</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DEMO_ADMIN_BOOKINGS.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-foreground">{b.id}</td>
                  <td className="py-3 font-semibold text-foreground">{b.patient}</td>
                  <td className="py-3 text-primary font-medium">{b.doctor}</td>
                  <td className="py-3 text-muted-foreground">{b.time}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md bg-[hsl(var(--muted)/0.5)] font-medium text-[10px]">
                      {b.type}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status}
                    </span>
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
