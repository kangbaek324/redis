import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/item/redis")
  async createItemR(@Body() data) {
    return await this.appService.createItemR(data);
  }

  @Get("/item/redis/:name")
  async getItemR(@Param("name") name: string) {
    return await this.appService.getItemR(name);
  }

  @Post("/item/mysql/")
  async createItemM(@Body() data) {
    return await this.appService.createItemM(data);
  }

  @Get("/item/mysql/:name")
  async getItemM(@Param("name") name: string) {
    return await this.appService.getItemM(name);
  }
} 
