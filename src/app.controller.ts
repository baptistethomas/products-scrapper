import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // Backmarket Get price of a product
  @Get('/scrappers/backmarket/:productName')
  async getProductPriceFromBackmarket(@Param() params): Promise<void> {
    return this.appService.getProductPriceFromBackmarket(params.productName);
  }
}
