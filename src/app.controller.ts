import {
 
  BadRequestException,
  ConflictException,
  Controller,

  Get,

  HttpException,
  HttpStatus,
  NotFoundException,
 
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  test() {
    throw new BadRequestException();
    // throw new NotFoundException();  //
    throw new HttpException('sdasd', HttpStatus.FORBIDDEN);
    // throw new UnauthorizedException();  // Ruxsatsiz
    // throw new ForbiddenException(); // Taqiqlangan
    // throw new NotAcceptableException(); //Qabul qilinmaydi
    // throw new RequestTimeoutException(); //So'rov muddati tugashi
  }
}
