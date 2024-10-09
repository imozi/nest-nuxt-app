import { Controller, Get, HttpStatus, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAccessGuard } from '@/guards';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  async findUnique(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ) {
    return await this.sessionService.findUnique(id);
  }
}
