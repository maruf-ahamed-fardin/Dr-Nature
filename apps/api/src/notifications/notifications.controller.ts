import { Controller, Get, Patch, Param, UseGuards, Req } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.notificationsService.findForUser(req.user.id);
  }

  @Patch("read-all")
  markAllRead(@Req() req: any) {
    return this.notificationsService.markAllRead(req.user.id);
  }

  @Patch(":id/read")
  markRead(@Req() req: any, @Param("id") id: string) {
    return this.notificationsService.markRead(id, req.user.id);
  }
}
