import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Leaves } from './types';
import { EnvironmentVariables } from './configuration';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  public get<T extends Leaves<EnvironmentVariables>>(variable: T) {
    return this.configService.get(variable);
  }
}
