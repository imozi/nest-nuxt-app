import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findMany() {
    return await this.accountRepository.findMany();
  }

  async findById(uuid: string) {
    return await this.accountRepository.findById(uuid);
  }
}
