import { Body, Controller, Post } from "@nestjs/common";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Post()
  create(@Body() body: { userId: string; serviceId: string; startsAt: string; endsAt: string; mode: "ONLINE" | "IN_PERSON"; consultantId?: string }) {
    return this.bookings.create({ ...body, startsAt: new Date(body.startsAt), endsAt: new Date(body.endsAt) });
  }
}
