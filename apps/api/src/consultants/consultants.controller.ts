import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConsultantsService } from "./consultants.service";

@Controller("consultants")
export class ConsultantsController {
  constructor(private readonly consultantsService: ConsultantsService) {}

  @Get()
  findAll() {
    return this.consultantsService.findAll();
  }

  @Get("services")
  findServices() {
    return this.consultantsService.findServices();
  }

  @Get("services/:slug")
  findServiceBySlug(@Param("slug") slug: string) {
    return this.consultantsService.findServiceBySlug(slug);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.consultantsService.findById(id);
  }

  @Get(":id/slots")
  findSlots(
    @Param("id") id: string,
    @Query("from") from: string,
    @Query("to") to: string
  ) {
    return this.consultantsService.findAvailableSlots(
      id,
      new Date(from),
      new Date(to)
    );
  }
}
