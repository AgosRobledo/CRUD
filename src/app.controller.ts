import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//maneja las rutas
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //@get(/api)
  getHello(): string {
    return this.appService.getHello();
  }
}
