import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  CheckCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BOOKINGS = [
  {
    id: "DNB-481923",
    consultant: "Dr. Nadia Islam",
    specialization: "Functional Nutrition & Metabolic Health",
    date: "Tomorrow, October 1, 2026",
    time: "10:00 AM – 10:45 AM (BST)",
    type: "Online Video Consultation",
    status: "CONFIRMED",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    notes: "Follow-up discussion on blood panel & gut protocol results.",
  },
  {
    id: "DNB-319082",
    consultant: "Dr. Farhan Ahmed",
    specialization: "Ayurvedic & Gut Health",
    date: "September 10, 2026",
    time: "04:30 PM – 05:15 PM",
    type: "Online Video Consultation",
    status: "COMPLETED",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
    notes: "Initial discovery session. Diagnosed low stomach acidity and dysbiosis.",
    hasPlan: true,
  },
];

export default function AccountBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            My Consultations & Protocols
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Access your telemedicine sessions, doctor notes, and customized diet plans.
          </p>
        </div>
        <Button asChild>
          <Link href="/booking">
            <Plus className="w-4 h-4 mr-1.5" /> Book New Session
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {BOOKINGS.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <div>
                <span className="text-[11px] font-mono text-muted-foreground">{booking.id}</span>
                <h3 className="font-bold text-base text-foreground">{booking.type}</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                  booking.status === "CONFIRMED"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {booking.status === "CONFIRMED" ? "Confirmed (Upcoming)" : "Completed"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 border border-border">
                <Image
                  src={booking.image}
                  alt={booking.consultant}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground">{booking.consultant}</h4>
                <span className="text-xs text-primary font-medium block mb-1">
                  {booking.specialization}
                </span>
                <p className="text-xs text-muted-foreground">{booking.notes}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs bg-[hsl(var(--muted)/0.3)] p-4 rounded-2xl border border-border/70">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Clock className="w-4 h-4 text-primary" />
                <span>{booking.time}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                Fee Paid: <strong className="text-foreground">{booking.fee}</strong>
              </span>

              <div className="flex gap-2 w-full sm:w-auto">
                {booking.status === "CONFIRMED" ? (
                  <Button className="w-full sm:w-auto">
                    <Video className="w-4 h-4 mr-2" /> Enter Video Room
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" /> Download Clinical Diet Plan (PDF)
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
