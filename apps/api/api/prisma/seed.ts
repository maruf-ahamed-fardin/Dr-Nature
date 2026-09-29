import { PrismaClient, UserRole, ProductStatus } from "@prisma/client";
import argon2 from "argon2";
const prisma=new PrismaClient();
async function main(){
 const email=process.env.ADMIN_EMAIL||"admin@drnatures.local";const password=process.env.ADMIN_PASSWORD||"ChangeMe-Immediately!";
 const passwordHash=await argon2.hash(password);
 await prisma.user.upsert({where:{email},update:{role:UserRole.ADMIN,passwordHash,isActive:true},create:{email,name:"Dr Natures Admin",passwordHash,role:UserRole.ADMIN}});
 const zones=[
  ["Dhaka City","Dhaka","",80,1,2],["Chattogram","Chattogram","",130,2,4],["Sylhet","Sylhet","",130,2,4],["Rajshahi","Rajshahi","",130,2,4],["Khulna","Khulna","",130,2,4],["Other Bangladesh","Other","",160,3,6]
 ] as const;
 for(const [name,city,area,fee,min,max] of zones) await prisma.shippingZone.upsert({where:{id:`seed-${city.toLowerCase()}`},update:{name,city,area:area||null,fee,etaMinDays:min,etaMaxDays:max,active:true},create:{id:`seed-${city.toLowerCase()}`,name,city,area:area||null,fee,etaMinDays:min,etaMaxDays:max,active:true}});
 const categories=[{name:"Supplements",slug:"supplements"},{name:"Books",slug:"books"},{name:"Wellness",slug:"wellness"}];
 for(const c of categories)await prisma.category.upsert({where:{slug:c.slug},update:{name:c.name},create:c});
 console.log(`Seeded admin ${email} and ${zones.length} shipping zones.`);
}
main().finally(()=>prisma.$disconnect());
