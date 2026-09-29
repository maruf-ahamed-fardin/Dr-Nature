import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { BookingMode } from "@prisma/client";
import { BookingsService } from "./bookings.service";
import { AuthGuard } from "../auth/auth.guard";
class CreateBookingDto { @IsString() serviceId!:string; @IsDateString() startsAt!:string; @IsDateString() endsAt!:string; @IsEnum(BookingMode) mode!:BookingMode; @IsOptional() @IsString() consultantId?:string; @IsOptional() @IsString() notes?:string; }
@Controller("bookings") @UseGuards(AuthGuard)
export class BookingsController { constructor(private readonly bookings:BookingsService){} @Post() create(@Body() body:CreateBookingDto,@Req() req:any){return this.bookings.create({userId:req.user.id,...body,startsAt:new Date(body.startsAt),endsAt:new Date(body.endsAt)})} }
