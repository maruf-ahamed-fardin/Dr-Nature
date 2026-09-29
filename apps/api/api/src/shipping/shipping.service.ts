import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ShipmentStatus } from "@prisma/client";
import { UpdateShipmentDto } from "./shipping.dto";
@Injectable()
export class ShippingService {
  constructor(private readonly prisma: PrismaService) {}
  zones(){return this.prisma.shippingZone.findMany({where:{active:true},orderBy:[{city:"asc"},{area:"asc"}]});}
  async quote(city:string, area?:string){
    const areaFilter=area?[{area},{area:null}]:[{area:null}];
    const zone=await this.prisma.shippingZone.findFirst({where:{active:true,city,OR:areaFilter},orderBy:{area:"desc"}});
    if(!zone) throw new NotFoundException("No delivery zone found for this address.");
    return {zoneId:zone.id,fee:zone.fee,etaMinDays:zone.etaMinDays,etaMaxDays:zone.etaMaxDays,name:zone.name};
  }
  async updateShipment(orderId:string,dto:UpdateShipmentDto){
    const order=await this.prisma.order.findUnique({where:{id:orderId}}); if(!order) throw new NotFoundException("Order not found.");
    if(dto.status===ShipmentStatus.SHIPPED && !dto.trackingNumber) throw new BadRequestException("Tracking number is required when shipping an order.");
    const shippedAt=dto.status===ShipmentStatus.SHIPPED||dto.status===ShipmentStatus.IN_TRANSIT||dto.status===ShipmentStatus.OUT_FOR_DELIVERY ? new Date() : undefined;
    const deliveredAt=dto.status===ShipmentStatus.DELIVERED ? new Date() : undefined;
    return this.prisma.$transaction(async tx=>{
      const shipment=await tx.shipment.upsert({where:{orderId},create:{orderId,zoneId:order.shippingZoneId,status:dto.status,courier:dto.courier,trackingNumber:dto.trackingNumber,note:dto.note,shippedAt,deliveredAt},update:{status:dto.status,courier:dto.courier,trackingNumber:dto.trackingNumber,note:dto.note,shippedAt,deliveredAt},include:{zone:true}});
      if(dto.status===ShipmentStatus.SHIPPED||dto.status===ShipmentStatus.IN_TRANSIT||dto.status===ShipmentStatus.OUT_FOR_DELIVERY) await tx.order.update({where:{id:orderId},data:{status:"SHIPPED"}});
      if(dto.status===ShipmentStatus.DELIVERED) await tx.order.update({where:{id:orderId},data:{status:"DELIVERED"}});
      return shipment;
    });
  }
  async getShipmentForUser(userId:string,orderId:string){
    const shipment=await this.prisma.shipment.findFirst({where:{orderId,order:{userId}},include:{zone:true}}); if(!shipment) throw new NotFoundException("Shipment not found."); return shipment;
  }
}
