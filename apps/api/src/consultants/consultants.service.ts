import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConsultantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.consultant.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findById(id: string) {
    const consultant = await this.prisma.consultant.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        availability: {
          where: { startsAt: { gte: new Date() } },
          orderBy: { startsAt: "asc" },
          take: 30,
        },
      },
    });
    if (!consultant) throw new NotFoundException("Consultant not found");
    return consultant;
  }

  async findAvailableSlots(consultantId: string, from: Date, to: Date) {
    return this.prisma.availabilitySlot.findMany({
      where: {
        consultantId,
        startsAt: { gte: from },
        endsAt: { lte: to },
        bookings: { none: { status: { in: ["PENDING", "CONFIRMED"] } } },
      },
      orderBy: { startsAt: "asc" },
    });
  }

  async findServices() {
    return this.prisma.service.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
  }

  async findServiceBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({ where: { slug } });
    if (!service) throw new NotFoundException("Service not found");
    return service;
  }
}
