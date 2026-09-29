import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: { userId: string; serviceId: string; startsAt: Date; endsAt: Date; mode: "ONLINE" | "IN_PERSON"; consultantId?: string }) {
    const clash = await this.prisma.booking.findFirst({
      where: {
        consultantId: input.consultantId,
        status: { in: ["PENDING", "CONFIRMED"] },
        startsAt: { lt: input.endsAt },
        endsAt: { gt: input.startsAt },
      },
    });
    if (clash) throw new ConflictException("This consultation slot is already booked.");

    return this.prisma.booking.create({
      data: {
        bookingNumber: `BK-${Date.now()}`,
        ...input,
      },
    });
  }
}
