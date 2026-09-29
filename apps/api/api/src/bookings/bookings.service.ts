import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class BookingsService { constructor(private readonly prisma:PrismaService){}
 async create(input:{userId:string;serviceId:string;startsAt:Date;endsAt:Date;mode:"ONLINE"|"IN_PERSON";consultantId?:string;notes?:string}){
  if(input.endsAt<=input.startsAt)throw new BadRequestException("End time must be after start time.");
  const service=await this.prisma.service.findUnique({where:{id:input.serviceId}});if(!service||!service.active)throw new NotFoundException("Service not found.");
  if(input.consultantId){const clash=await this.prisma.booking.findFirst({where:{consultantId:input.consultantId,status:{in:["PENDING","CONFIRMED"]},startsAt:{lt:input.endsAt},endsAt:{gt:input.startsAt}}});if(clash)throw new ConflictException("This consultation slot is already booked.");}
  return this.prisma.booking.create({data:{bookingNumber:`BK-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`,userId:input.userId,serviceId:input.serviceId,consultantId:input.consultantId,mode:input.mode,startsAt:input.startsAt,endsAt:input.endsAt,notes:input.notes}});
 }
}
