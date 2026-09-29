import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class AddressesService { constructor(private readonly prisma:PrismaService){}
 list(userId:string){return this.prisma.address.findMany({where:{userId},orderBy:[{isDefault:"desc"},{createdAt:"desc"}]})}
 async create(userId:string,dto:any){return this.prisma.$transaction(async tx=>{if(dto.isDefault)await tx.address.updateMany({where:{userId},data:{isDefault:false}});return tx.address.create({data:{...dto,userId,country:"Bangladesh"}})})}
 async get(userId:string,id:string){const a=await this.prisma.address.findFirst({where:{id,userId}});if(!a)throw new NotFoundException("Address not found.");return a}
 async remove(userId:string,id:string){const a=await this.get(userId,id);return this.prisma.address.delete({where:{id:a.id}})}
}
