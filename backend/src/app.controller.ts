import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): any {
    return {
      success: true,
      message: '백엔드 API가 정상적으로 작동 중입니다!',
      timestamp: new Date().toISOString()
    };
  }
}
